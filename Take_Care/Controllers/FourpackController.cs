using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers {
	public class FourpackController : Controller {
		[Route("/Fourpacks/Index")]
		public IActionResult Index() {
			return View();
		}
	}
}
