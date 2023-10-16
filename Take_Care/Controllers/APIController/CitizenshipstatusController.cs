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
    public class CitizenshipstatusController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public CitizenshipstatusController(TakeCareContext context)
        {
            _context = context;
        }

        // GET: api/Citizenshipstatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Citizenshipstatus>>> GetCitizenshipstatuses()
        {
          if (_context.Citizenshipstatuses == null)
          {
              return NotFound();
          }
            return await _context.Citizenshipstatuses.ToListAsync();
        }

        // GET: api/Citizenshipstatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Citizenshipstatus>> GetCitizenshipstatus(int id)
        {
          if (_context.Citizenshipstatuses == null)
          {
              return NotFound();
          }
            var citizenshipstatus = await _context.Citizenshipstatuses.FindAsync(id);

            if (citizenshipstatus == null)
            {
                return NotFound();
            }

            return citizenshipstatus;
        }

        // PUT: api/Citizenshipstatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCitizenshipstatus(int id, Citizenshipstatus citizenshipstatus)
        {
            if (id != citizenshipstatus.CitizenshipstatuId)
            {
                return BadRequest();
            }

            _context.Entry(citizenshipstatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CitizenshipstatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Citizenshipstatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Citizenshipstatus>> PostCitizenshipstatus(Citizenshipstatus citizenshipstatus)
        {
          if (_context.Citizenshipstatuses == null)
          {
              return Problem("Entity set 'TakeCareContext.Citizenshipstatuses'  is null.");
          }
            _context.Citizenshipstatuses.Add(citizenshipstatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCitizenshipstatus", new { id = citizenshipstatus.CitizenshipstatuId }, citizenshipstatus);
        }

        // DELETE: api/Citizenshipstatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCitizenshipstatus(int id)
        {
            if (_context.Citizenshipstatuses == null)
            {
                return NotFound();
            }
            var citizenshipstatus = await _context.Citizenshipstatuses.FindAsync(id);
            if (citizenshipstatus == null)
            {
                return NotFound();
            }

            _context.Citizenshipstatuses.Remove(citizenshipstatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CitizenshipstatusExists(int id)
        {
            return (_context.Citizenshipstatuses?.Any(e => e.CitizenshipstatuId == id)).GetValueOrDefault();
        }
    }
}
