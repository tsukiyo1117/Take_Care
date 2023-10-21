using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Web;
using Take_Care.Models;
using System.Security.Cryptography;
using System.Text.Json;
using Newtonsoft.Json;
using ECPay.Payment.Integration;
using HttpMethod = ECPay.Payment.Integration.HttpMethod;

namespace Take_Care.Controllers.APIController
{
    public class ECPayController : Controller
    {
        private readonly TakeCareContext _context;

        public ECPayController(TakeCareContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult DoTestPay([FromBody] Case usercase)
        {
            var orderId = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 20);
            //需填入你的網址
            var website = $"https://localhost:7036";
            var order = new Dictionary<string, string>
            {
                //綠界需要的參數
                { "MerchantTradeNo", orderId },
                { "MerchantTradeDate", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") },
                { "TotalAmount", usercase.Amount.ToString() },
                { "TradeDesc", "無" },
                { "ItemName", usercase.ServiceName },
                { "ExpireDate", "3" },
                // { "CustomField1", usercase.CaseId.ToString() },
                { "CustomField1", "1" },
                { "ReturnURL", $"{website}/api/AddPayInfo" },
                //{ "OrderResultURL", $"{website}/ECPay/PayInfo/{orderId}" },
                { "OrderResultURL", "" },
                //{ "PaymentInfoURL", $"{website}/api/AddAccountInfo" },
                { "PaymentInfoURL", "" },
                { "ClientRedirectURL", $"{website}/ECPay/SetPay/{orderId}" },
                { "MerchantID", "2000132" },
                { "IgnorePayment", "GooglePay#WebATM#CVS#BARCODE" },
                { "PaymentType", "aio" },
                { "ChoosePayment", "ALL" },
                { "EncryptType", "1" },
            };
            order["CheckMacValue"] = GetCheckMacValue(order);
            EcpayOrder ECorder = new EcpayOrder();
            ECorder.MemberId = order["CustomField1"];
            ECorder.MerchantTradeNo = order["MerchantTradeNo"];
            ECorder.RtnCode = 0;
            ECorder.RtnMsg = "訂單成功尚未付款";
            ECorder.TradeNo = order["MerchantID"];
            ECorder.TradeAmt = Convert.ToInt32(order["TotalAmount"]);
            ECorder.PaymentDate = Convert.ToDateTime(order["MerchantTradeDate"]);
            ECorder.PaymentType = order["PaymentType"];
            ECorder.PaymentTypeChargeFee = "0";
            ECorder.TradeDate = order["MerchantTradeDate"];
            ECorder.SimulatePaid = 0;
            _context.EcpayOrders.Add(ECorder);
            _context.SaveChanges();
            // HttpClient Client = new HttpClient();
            // HttpContent content = new StringContent(JsonConvert.SerializeObject(order), Encoding.UTF8, "application/json");
            // HttpResponseMessage response = Client.PostAsync("https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5", content).Result;
            // string strResponse =  response.Content.ReadAsStringAsync().Result;
            // var result = JsonConvert.DeserializeObject<T>(strResponse);
            return Json(order);
        }

        public IActionResult SetPay(IFormCollection id)
        {
            var data = new Dictionary<string, string>();
            foreach (string key in id.Keys)
            {
                data.Add(key, id[key]);
            }

            var order = _context.EcpayOrders.ToList().Where(x => x.MerchantTradeNo == id["MerchantTradeNo"])
                .FirstOrDefault();
            order.RtnCode = int.Parse(id["RtnCode"]);
            order.RtnMsg = (id["RtnMsg"] == "Succeeded") ? "訂單成功已付款" : order.RtnMsg;
            order.PaymentDate = Convert.ToDateTime(id["PaymentDate"]);
            order.SimulatePaid = int.Parse(id["SimulatePaid"]);
            _context.SaveChanges();
            
            return View("~/Views/CsMember/Profile.cshtml");
        }

        private string GetCheckMacValue(Dictionary<string, string> order)
        {
            var param = order.Keys.OrderBy(x => x).Select(key => key + "=" + order[key]).ToList();

            var checkValue = string.Join("&", param);
            //測試用的 HashKey
            var hashKey = "5294y06JbISpM5x9";
            //測試用的 HashIV
            var HashIV = "v77hoKGq4kWxNNIS";
            checkValue = $"HashKey={hashKey}" + "&" + checkValue + $"&HashIV={HashIV}";
            checkValue = HttpUtility.UrlEncode(checkValue).ToLower();
            checkValue = GetSHA256(checkValue);
            return checkValue.ToUpper();
        }

        private string GetSHA256(string value)
        {
            var result = new StringBuilder();
            var sha256 = SHA256.Create();
            var bts = Encoding.UTF8.GetBytes(value);
            var hash = sha256.ComputeHash(bts);
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }

            return result.ToString();
        }
    }
}