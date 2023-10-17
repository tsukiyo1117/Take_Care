using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Take_Care.Hubs;
using Take_Care.Models;

namespace Take_Care.Controllers {
	public class LoginController : Controller {
		private readonly IHubContext<ChatHub> _hubContext;
		private readonly TakeCareContext _context;

		public LoginController(IHubContext<ChatHub> hubContext, TakeCareContext context) {
			_context = context;
			_hubContext = hubContext;
		}
		public IActionResult Index() {
			if (TempData["member"] == null) {
				return View();
			}
			else {
				return View(TempData["member"]);
			}
		}

		[HttpPost]
		public IActionResult DoLogin([FromBody] MemberView member) {
			var query = from o in _context.MemberViews
						where o.Account == member.Account && o.Password == member.Password
						select o;
			if (query.SingleOrDefault() == null) {
				return Json("error!");
			}
			else {
				return Json(query.SingleOrDefault());
			}
		}
		public IActionResult SignUp() {
			return View();
		}
		[HttpPost]
		public IActionResult DoSignUp([FromBody] Employer member) {
			var query = from o in _context.Employers
						where o.Email == member.Email
						select o;
			if (query.Count() > 0) {
				return Json("此帳號已經存在!");
			}
			else {

				return Json("寄信成功!!");
			}
		}
		public IActionResult doCheckEmail([FromBody] CheckEmail email) {
			CheckEmail cheachEmail = email;
			var chatcode = "";

			if (email.checkcode != cheachEmail.checkcode) {
				return Json(false);
			}
			else {
				return Json(true);
			}
		}
		public class CheckEmail {
			public string email { get; set; }
			public string checkcode { get; set; }
		}
	}
}
