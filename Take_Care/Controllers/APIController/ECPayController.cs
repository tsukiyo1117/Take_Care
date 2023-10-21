﻿using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Web;
using Take_Care.Models;
using XSystem.Security.Cryptography;

namespace Take_Care.Controllers.APIController {
	public class ECPayController : Controller {
		private readonly TakeCareContext _CareContext;
        public ECPayController(TakeCareContext context)
        {
			_CareContext = context;   
        }

		[HttpPost]
        public Task<string> DoTestPay(Case usercase) {

			return "";
		}
		private string GetCheckMacValue(Dictionary<string, string> order) {
			var param = order.Keys.OrderBy(x => x).Select(key => key + "=" + order[key]).ToList()

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
