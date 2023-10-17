using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
	public class StaffController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

        public IActionResult SelfIntro()
        {
            return View();
        }

        public IActionResult ChangePassword()
        {
            return View();
        }

    }
}
