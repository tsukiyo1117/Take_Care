using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
	public class AboutUsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Staff()
		{
			return View();
		}
	}
}
