using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers {
    public class ApplicationController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
