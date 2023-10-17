using Microsoft.AspNetCore.Mvc;
using Take_Care.Models;

namespace Take_Care.Controllers
{
	public class AboutUsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
		
		// 員工
		private EmployeeContext _context;
		public AboutUsController()
		{
			_context = new EmployeeContext();
		}
		public IActionResult Staff()
		{
			List<Employee> employees = _context.Employees.ToList();
			return View(employees);
		}
	}
}
