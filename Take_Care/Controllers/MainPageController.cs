using Microsoft.AspNetCore.Mvc;

namespace Take_Care.Controllers
{
    public class MainPageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
