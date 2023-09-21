using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.AspNetCore.SignalR;
using Take_Care.Hubs;

namespace Take_Care.Controllers {
    public class LoginController : Controller {
        private readonly IHubContext<ChatHub> _hubContext;

        public LoginController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public IActionResult Index() {
            
            return View();
        }

        [HttpPost]
        public IActionResult Index(string account,string password)
        {
            TempData["Member"] = new
            {
                Account = account,
                Password = password
            };
            
            return View();
        }

        /*public IActionResult sing()
        {
            return View();
        }*/
    }
}
