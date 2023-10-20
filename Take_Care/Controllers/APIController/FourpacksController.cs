using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Take_Care.Models;

namespace Take_Care.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FourpacksController : ControllerBase
    {
        private TakeCareContext _context;
        public FourpacksController(TakeCareContext dbContext)
        {
            _context = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fourpack>>> GetTodoItems()
        {

            if (_context.Fourpacks == null)
            {
                return NotFound();
            }
            return await _context.Fourpacks.ToListAsync();
        }
    }
}
