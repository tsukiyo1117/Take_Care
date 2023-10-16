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
    public class PersonalInfoesController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public PersonalInfoesController(TakeCareContext context)
        {
            _context = context;
        }

        // GET: api/PersonalInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonalInfo>>> GetPersonalInfos()
        {
            if (_context.PersonalInfos == null)
            {
                return NotFound();
            }
            return await _context.PersonalInfos.ToListAsync();
        }

        // GET: api/PersonalInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalInfo>> GetPersonalInfo(int id)
        {
            if (_context.PersonalInfos == null)
            {
                return NotFound();
            }
            var personalInfo = await _context.PersonalInfos.FindAsync(id);

            if (personalInfo == null)
            {
                return NotFound();
            }

            return personalInfo;
        }

        // PUT: api/PersonalInfoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonalInfo(int id, PersonalInfo personalInfo)
        {
            if (id != personalInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(personalInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonalInfoExists(id))
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

        // POST: api/PersonalInfoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonalInfo>> PostPersonalInfo(PersonalInfo personalInfo)
        {
            if (_context.PersonalInfos == null)
            {
                return Problem("Entity set 'TakeCareContext.PersonalInfos'  is null.");
            }
            _context.PersonalInfos.Add(personalInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonalInfo", new { id = personalInfo.Id }, personalInfo);
        }

        // DELETE: api/PersonalInfoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonalInfo(int id)
        {
            if (_context.PersonalInfos == null)
            {
                return NotFound();
            }
            var personalInfo = await _context.PersonalInfos.FindAsync(id);
            if (personalInfo == null)
            {
                return NotFound();
            }

            _context.PersonalInfos.Remove(personalInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonalInfoExists(int id)
        {
            return (_context.PersonalInfos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
