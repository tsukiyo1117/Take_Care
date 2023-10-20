using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
    public class CsMemberController : Controller
    {


        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult CsProfile() {

            return View();

        }

        public IActionResult ChangePassword() {

            return View();

        }

        public IActionResult Notification() {

            return View();

        }
		
    }
}
