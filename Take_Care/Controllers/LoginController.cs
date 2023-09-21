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

            return View();
        }

        [HttpPost]
        public IActionResult Index(string account, string password) {
            try {
                var query = from o in _context.MemberViews
                            where o.Account == account
                            select o;
                TempData["Member"] = query.ToList();
            }
            catch (Exception) {
                throw;
            }
            return View();
        }

        /*public IActionResult sing()
        {
            return View();
        }*/
    }
}
