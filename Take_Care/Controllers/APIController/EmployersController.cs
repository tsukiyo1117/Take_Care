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
    public class EmployersController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public EmployersController(TakeCareContext context)
        {
            _context = context;
        }

        // GET: api/Employers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employer>>> GetEmployers()
        {
            if (_context.Employers == null)
            {
                return NotFound();
            }
            return await _context.Employers.ToListAsync();
        }

        // GET: api/Employers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            if (_context.Employers == null)
            {
                return NotFound();
            }
            var employer = await _context.Employers.FindAsync(id);

            if (employer == null)
            {
                return NotFound();
            }

            return employer;
        }

        // PUT: api/Employers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployer(int id, Employer employer)
        {
            if (id != employer.EmployerId)
            {
                return BadRequest();
            }

            _context.Entry(employer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployerExists(id))
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

        // POST: api/Employers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employer>> PostEmployer(Employer employer)
        {
            if (_context.Employers == null)
            {
                return Problem("Entity set 'TakeCareContext.Employers'  is null.");
            }
            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployer", new { id = employer.EmployerId }, employer);
        }

        // DELETE: api/Employers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployer(int id)
        {
            if (_context.Employers == null)
            {
                return NotFound();
            }
            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            _context.Employers.Remove(employer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployerExists(int id)
        {
            return (_context.Employers?.Any(e => e.EmployerId == id)).GetValueOrDefault();
        }
    }
}
