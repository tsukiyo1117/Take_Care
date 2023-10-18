using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
	public class StaffController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
