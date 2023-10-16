using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Take_Care.Hubs;
using Take_Care.Models;

namespace Take_Care.Controllers {
    public class TrialBalanceController : Controller {
		//private readonly IHubContext<ChatHub> _hubContext;
		private readonly TakeCareContext _context;

		public TrialBalanceController(TakeCareContext context) {
			_context = context;
		}
		public IActionResult Index() {
            var query = from o in _context.Citizenshipstatuses
                        select o;

            //List<Citizenshipstatus> Citizenshipstatus = new List<Citizenshipstatus>() {
                
            //};



            return View(query.ToList());
        }
    }
}
