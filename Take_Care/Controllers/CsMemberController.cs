using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
    public class CsMemberController : Controller
    {
        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult Employer() {
        return View();
        }
    }
}
