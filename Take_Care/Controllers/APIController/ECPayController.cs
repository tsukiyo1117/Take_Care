﻿using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Web;
using Take_Care.Models;
using XSystem.Security.Cryptography;

namespace Take_Care.Controllers.APIController {
	public class ECPayController : Controller {
		private readonly TakeCareContext _CareContext;
		public ECPayController(TakeCareContext context) {
			_CareContext = context;
		}

		//[HttpPost]
		public IActionResult DoTestPay(Case usercase) {
			var orderId = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 20);
			//需填入你的網址
			var website = $"https://localhost:7036";
			var order = new Dictionary<string, string>
			{
				//綠界需要的參數
				{ "MerchantTradeNo", usercase.CaseId.ToString()},
				{ "MerchantTradeDate",  DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss")},
				{ "TotalAmount",  usercase.Amount.ToString()},
				{ "TradeDesc",  "無"},
				{ "ItemName", usercase.ServiceName },
				{ "ExpireDate",  "3"},
				{ "ReturnURL",  $"{website}/api/AddPayInfo"},
				{ "OrderResultURL", $"{website}/ECPay/PayInfo/{orderId}"},
				{ "PaymentInfoURL",  $"{website}/api/AddAccountInfo"},
				{ "ClientRedirectURL",  $"{website}/ECPay/AccountInfo/{orderId}"},
				{ "MerchantID",  "2000132"},
				{ "IgnorePayment",  "GooglePay#WebATM#CVS#BARCODE"},
				{ "PaymentType",  "aio"},
				{ "ChoosePayment",  "ALL"},
				{ "EncryptType",  "1"},
			};
			order["CheckMacValue"] = GetCheckMacValue(order);
			return Json(order);
		}
		private string GetCheckMacValue(Dictionary<string, string> order) {
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
		private string GetSHA256(string value) {
			var result = new StringBuilder();
			var sha256 = SHA256Managed.Create();
			var bts = Encoding.UTF8.GetBytes(value);
			var hash = sha256.ComputeHash(bts);
			for (int i = 0; i < hash.Length; i++) {
				result.Append(hash[i].ToString("X2"));
			}
			return result.ToString();
		}
	}
}
