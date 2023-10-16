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
    public class ServiceItemsDetailsController : ControllerBase
    {
        private readonly TakeCareContext _context;

        public ServiceItemsDetailsController(TakeCareContext context)
        {
            _context = context;
        }

        // GET: api/ServiceItemsDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceItemsDetail>>> GetServiceItemsDetails()
        {
          if (_context.ServiceItemsDetails == null)
          {
              return NotFound();
          }
            return await _context.ServiceItemsDetails.ToListAsync();
        }

        // GET: api/ServiceItemsDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceItemsDetail>> GetServiceItemsDetail(int id)
        {
          if (_context.ServiceItemsDetails == null)
          {
              return NotFound();
          }
            var serviceItemsDetail = await _context.ServiceItemsDetails.FindAsync(id);

            if (serviceItemsDetail == null)
            {
                return NotFound();
            }

            return serviceItemsDetail;
        }

        // PUT: api/ServiceItemsDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceItemsDetail(int id, ServiceItemsDetail serviceItemsDetail)
        {
            if (id != serviceItemsDetail.ServiceItemId)
            {
                return BadRequest();
            }

            _context.Entry(serviceItemsDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceItemsDetailExists(id))
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

        // POST: api/ServiceItemsDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceItemsDetail>> PostServiceItemsDetail(ServiceItemsDetail serviceItemsDetail)
        {
          if (_context.ServiceItemsDetails == null)
          {
              return Problem("Entity set 'TakeCareContext.ServiceItemsDetails'  is null.");
          }
            _context.ServiceItemsDetails.Add(serviceItemsDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceItemsDetail", new { id = serviceItemsDetail.ServiceItemId }, serviceItemsDetail);
        }

        // DELETE: api/ServiceItemsDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceItemsDetail(int id)
        {
            if (_context.ServiceItemsDetails == null)
            {
                return NotFound();
            }
            var serviceItemsDetail = await _context.ServiceItemsDetails.FindAsync(id);
            if (serviceItemsDetail == null)
            {
                return NotFound();
            }

            _context.ServiceItemsDetails.Remove(serviceItemsDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceItemsDetailExists(int id)
        {
            return (_context.ServiceItemsDetails?.Any(e => e.ServiceItemId == id)).GetValueOrDefault();
        }
    }
}
