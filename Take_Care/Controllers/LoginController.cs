using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers {
    public class LoginController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
