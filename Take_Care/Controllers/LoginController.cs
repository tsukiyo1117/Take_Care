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
			TempData["member"] = query.FirstOrDefault();
			if (query.SingleOrDefault() == null) {
				return Json("erroe!");
			}
			else {
				return Json("done!");
			}
		}

		/*public IActionResult sing()
        {
            return View();
        }*/
	}
}
