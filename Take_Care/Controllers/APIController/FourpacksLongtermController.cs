using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Take_Care.Models;

namespace Take_Care.Controllers.APIController
{
        [Route("api/[controller]")]
        [ApiController]
        public class FourpacksLongtermController : ControllerBase
        {
            private TakeCareContext _context;
            public FourpacksLongtermController(TakeCareContext dbContext)
            {
                _context = dbContext;
            }
            [HttpGet]
            public async Task<ActionResult<IEnumerable<FourpacksLongterm>>> GetTodoItems()
            {

                if (_context.Fourpacks == null)
                {
                    return NotFound();
                }
                return await _context.FourpacksLongterms.ToListAsync();
            }
        }
}
