using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using Take_Care.Hubs;
using Take_Care.Models;

namespace Take_Care.Controllers {
    public class HomeController : Controller {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<ChatHub> _hubContext;
        public HomeController(ILogger<HomeController> logger, IHubContext<ChatHub> hubContext) {
            _logger = logger;
            _hubContext = hubContext;
        }

        public IActionResult Index()
        {
            ViewData["id"] = ChatHub.ConnIDList;
            return View();
        }

        public IActionResult Privacy() {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}