using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Take_Care.Models;

namespace Take_Care.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly TakeCareContext _context;

        public HomeController(ILogger<HomeController> logger, TakeCareContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public  IActionResult GetPersonalInfoEmployer()
        {
            var query = from p in _context.PersonalInfos
                join e in _context.Employers on p.EmployerId equals e.EmployerId
                select p;

            return  Json("done");
        }

        // [HttpGet( "{id:int}")]
        [HttpGet]

        public IActionResult GetPersonalInfoDetail()
        {
            var query = from o in _context.Employers
                join p in _context.PersonalInfos on o.EmployerId equals p.EmployerId
                join e in _context.EmergencyContacts on p.Id equals e.ContactId
                // where o.EmployerId == id
                select new
                {
                   EmployerID = o.EmployerId,

                   
                };
                                        
            return Json(query);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}