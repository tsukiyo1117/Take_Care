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
    public class SubsidyLevelsController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public SubsidyLevelsController(TakeCareContext context)
        {
            _context = context;
        }

        // GET: api/SubsidyLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubsidyLevel>>> GetSubsidyLevels()
        {
          if (_context.SubsidyLevels == null)
          {
              return NotFound();
          }
            return await _context.SubsidyLevels.ToListAsync();
        }

        // GET: api/SubsidyLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubsidyLevel>> GetSubsidyLevel(int id)
        {
          if (_context.SubsidyLevels == null)
          {
              return NotFound();
          }
            var subsidyLevel = await _context.SubsidyLevels.FindAsync(id);

            if (subsidyLevel == null)
            {
                return NotFound();
            }

            return subsidyLevel;
        }

        // PUT: api/SubsidyLevels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubsidyLevel(int id, SubsidyLevel subsidyLevel)
        {
            if (id != subsidyLevel.SubsidyLevelId)
            {
                return BadRequest();
            }

            _context.Entry(subsidyLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubsidyLevelExists(id))
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

        // POST: api/SubsidyLevels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubsidyLevel>> PostSubsidyLevel(SubsidyLevel subsidyLevel)
        {
          if (_context.SubsidyLevels == null)
          {
              return Problem("Entity set 'TakeCareContext.SubsidyLevels'  is null.");
          }
            _context.SubsidyLevels.Add(subsidyLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubsidyLevel", new { id = subsidyLevel.SubsidyLevelId }, subsidyLevel);
        }

        // DELETE: api/SubsidyLevels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubsidyLevel(int id)
        {
            if (_context.SubsidyLevels == null)
            {
                return NotFound();
            }
            var subsidyLevel = await _context.SubsidyLevels.FindAsync(id);
            if (subsidyLevel == null)
            {
                return NotFound();
            }

            _context.SubsidyLevels.Remove(subsidyLevel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubsidyLevelExists(int id)
        {
            return (_context.SubsidyLevels?.Any(e => e.SubsidyLevelId == id)).GetValueOrDefault();
        }
    }
}
