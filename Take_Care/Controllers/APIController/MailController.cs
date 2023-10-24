using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Web;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Services;
using MimeKit;
using System.Net.Mail;
using Take_Care.Models;

namespace Take_Care.Controllers.APIController
{
    public class MailController : Controller
    {
        private readonly TakeCareContext _context;
        public MailController(TakeCareContext context)
        {
            _context = context;
        }
        /// <summary>
        /// 取得授權的項目
        /// </summary>
        static string[] Scopes = { GmailService.Scope.GmailSend };

        // 和登入 google 的帳號無關
        // 任意值，若未來有使用者認証，可使用使用者編號或登入帳號。
        string Username = "ABC";

        /// <summary>
        /// 存放 client_secret 和 credential 的地方
        /// </summary>
        string SecretPath = @"D:\project\GmailTest\Data\Secrets";
        //string SecretPath = @"Secrets";

        /// <summary>
        /// 認証完成後回傳的網址, 必需和 OAuth 2.0 Client Id 中填寫的 "已授權的重新導向 URI" 相同。
        /// </summary>
        string RedirectUri = $"https://localhost:7036/Mail/AuthReturn";

        /// <summary>
        /// 取得認証用的網址
        /// </summary>
        /// <returns></returns>
        public async Task<string> GetAuthUrl()
        {
            using (var stream = new FileStream(Path.Combine(SecretPath, "client_secret.json"), FileMode.Open, FileAccess.Read))
            {
                FileDataStore dataStore = null;
                var credentialRoot = Path.Combine(SecretPath, "Credentials");
                if (!Directory.Exists(credentialRoot))
                {
                    Directory.CreateDirectory(credentialRoot);
                }

                //存放 credential 的地方，每個 username 會建立一個目錄。
                string filePath = Path.Combine(credentialRoot, Username);
                dataStore = new FileDataStore(filePath);

                IAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = GoogleClientSecrets.Load(stream).Secrets,
                    Scopes = Scopes,
                    DataStore = dataStore
                });

                var authResult = await new AuthorizationCodeWebApp(flow, RedirectUri, Username)
                .AuthorizeAsync(Username, CancellationToken.None);

                return authResult.RedirectUri;
            }
        }
        public async Task<string> AuthReturn(AuthorizationCodeResponseUrl authorizationCode)
        {
            string[] scopes = new[] { GmailService.Scope.GmailSend };

            using (var stream = new FileStream(Path.Combine(SecretPath, "client_secret.json"), FileMode.Open, FileAccess.Read))
            {
                //確認 credential 的目錄已建立.
                var credentialRoot = Path.Combine(SecretPath, "Credentials");
                if (!Directory.Exists(credentialRoot))
                {
                    Directory.CreateDirectory(credentialRoot);
                }

                //暫存憑証用目錄
                string tempPath = Path.Combine(credentialRoot, authorizationCode.State);

                IAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(
                new GoogleAuthorizationCodeFlow.Initializer
                {
                    ClientSecrets = GoogleClientSecrets.Load(stream).Secrets,
                    Scopes = scopes,
                    DataStore = new FileDataStore(tempPath)
                });

                //這個動作應該是要把 code 換成 token
                await flow.ExchangeCodeForTokenAsync(Username, authorizationCode.Code, RedirectUri, CancellationToken.None).ConfigureAwait(false);

                if (!string.IsNullOrWhiteSpace(authorizationCode.State))
                {
                    string newPath = Path.Combine(credentialRoot, Username);
                    if (tempPath.ToLower() != newPath.ToLower())
                    {
                        if (Directory.Exists(newPath))
                            Directory.Delete(newPath, true);

                        Directory.Move(tempPath, newPath);
                    }
                }

                return "OK";
            }
        }


        //public async Task<string> SendTestMail([FromBody] string memberMessage) {
        public async Task<ResultMessage> SendTestMail([FromBody] string mail)
        {
            ResultMessage result = new ResultMessage();
            var query = from o in _context.MemberViews
                        where o.Email == mail
                        select o;
            if (query.Count() > 0)
            {
                result.Erroemsg = "此帳號已存在";
                return result;
            }
            result.MailCode = MakeRandon();
            var service = await GetGmailService();

            GmailMessage message = new GmailMessage();
            message.Subject = "信箱驗證碼";
            message.Body = $"<h1>驗證碼</h1><p>{result.MailCode}</p>";
            message.FromAddress = "94forteamwork@gmail.com";
            message.IsHtml = true;
            //message.ToRecipients = memberMessage;
            message.ToRecipients = mail;
            //message.Attachments = new List<Attachment>();

            //string filePath = @"D:\project\2045c0458a18bb9f49b6828fb35886ae.gif";    //要附加的檔案
            //Attachment attachment1 = new Attachment(filePath);
            //message.Attachments.Add(attachment1);

            SendEmail(message, service);
            Console.WriteLine("OK");

            return result;
            //return true;
        }

        async Task<GmailService> GetGmailService()
        {
            UserCredential credential = null;

            var credentialRoot = Path.Combine(SecretPath, "Credentials");
            if (!Directory.Exists(credentialRoot))
            {
                Directory.CreateDirectory(credentialRoot);
            }

            string filePath = Path.Combine(credentialRoot, Username);

            using (var stream = new FileStream(Path.Combine(SecretPath, "client_secret.json"), FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                GoogleClientSecrets.Load(stream).Secrets,
                Scopes,
                Username,
                CancellationToken.None,
                new FileDataStore(filePath));
            }

            var service = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Send Mail",
            });

            return service;
        }


        public class GmailMessage
        {
            public string FromAddress { get; set; }
            public string ToRecipients { get; set; }

            public string Subject { get; set; }
            public string Body { get; set; }
            public bool IsHtml { get; set; }

            public List<Attachment> Attachments { get; set; }
        }
        public class ResultMessage
        {
            public string Erroemsg { get; set; }
            public string MailCode { get; set; }
        }


        public static void SendEmail(GmailMessage email, GmailService service)
        {
            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(email.FromAddress);
            mailMessage.To.Add(email.ToRecipients);
            mailMessage.ReplyToList.Add(email.FromAddress);
            mailMessage.Subject = email.Subject;
            mailMessage.Body = email.Body;
            mailMessage.IsBodyHtml = email.IsHtml;

            if (email.Attachments != null)
            {
                foreach (Attachment attachment in email.Attachments)
                {
                    mailMessage.Attachments.Add(attachment);
                }
            }

            var mimeMessage = MimeMessage.CreateFromMailMessage(mailMessage);

            var gmailMessage = new Google.Apis.Gmail.v1.Data.Message
            {
                Raw = Encode(mimeMessage)
            };

            UsersResource.MessagesResource.SendRequest request = service.Users.Messages.Send(gmailMessage, "me");

            request.Execute();
        }

        public static string Encode(MimeMessage mimeMessage)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                mimeMessage.WriteTo(ms);
                return Convert.ToBase64String(ms.GetBuffer())
                    .TrimEnd('=')
                    .Replace('+', '-')
                    .Replace('/', '_');
            }
        }

        public string MakeRandon()
        {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var Charsarr = new char[8];
            var random = new Random();

            for (int i = 0; i < Charsarr.Length; i++)
            {
                Charsarr[i] = characters[random.Next(characters.Length)];
            }

            var resultString = new string(Charsarr);
            return resultString;
        }
    }
}
