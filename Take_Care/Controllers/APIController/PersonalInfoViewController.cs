using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Take_Care.Models;

namespace Take_Care.Controllers.APIController
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalInfoViewController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public PersonalInfoViewController(TakeCareContext context)
        {
            _context = context;
        }
        // GET: api/PersonalInfoView
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonalInfoView>>>GetPersonalInfoViews()
        {
            if (_context.PersonalInfoViews == null)
            {
                return NotFound();
            }
            return await _context.PersonalInfoViews.ToListAsync();
        }
    }
}