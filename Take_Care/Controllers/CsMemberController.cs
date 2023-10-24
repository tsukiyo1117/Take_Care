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

        public IActionResult CsRecord()
        {

            return View();

        }

		[HttpGet]
		public IActionResult Logout()
		{
			// 执行登出逻辑（清除用户会话等）

			// 重定向到首页
			return RedirectToAction("Index", "MainPage");
		}
        public IActionResult CsTrialBalance()
        {

            return View();

        }

        
    }
}
