using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Slot.Filter;
using Slot.Models;

namespace Slot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [slotlogFilter]
    public class SlotController : ControllerBase
    {
        private readonly AppDBContext _context;
        //logger obj for this controller class
        private readonly ILogger<SlotController> _logger;

        public SlotController(AppDBContext context, ILogger<SlotController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Slot
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Slots>>> Getslots()
        {
            _logger.LogInformation("Fetching all slots from the database."+DateTime.Now.ToString()+" "+ Request.Host.ToString());
            return await _context.slots.ToListAsync();
        }

        /*  [HttpGet]
          [Route("SlotTemp")]
          public async Task<ActionResult<IEnumerable<SlotTemp>>> GetTempSlots()
          {
              return await _context.SlotTemp.ToListAsync();
          }*/
        [HttpGet]
        [Route("SlotTemp")]
        public async Task<ActionResult<IEnumerable<object>>> GetTempSlots()
        {
            var slots = await _context.SlotTemp
                .Select(s => new {
                    
                    s.venueid,
                    s.slotdate,
                    s.todate,
                    s.starttime,
                    s.endtime,
                    s.duration,
                    s.rate
                })
                .ToListAsync();

            return Ok(slots);
        }

        // GET: api/Slot/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Slots>> GetSlots(int id)
        {
            var slots = await _context.slots.FindAsync(id);

            if (slots == null)
            {
                return NotFound();
            }

            return slots;
        }

        // PUT: api/Slot/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlots(int id, Slots slots)
        {
            if (id != slots.slotno)
            {
                return BadRequest();
            }

            _context.Entry(slots).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlotsExists(id))
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


        


        // POST: api/Slot
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SlotTemp>> PostSlots(SlotTemp slots)
        {
            _context.SlotTemp.Add(slots);
            await _context.SaveChangesAsync();
            _logger.LogInformation("SlotTemp added successfully at " + DateTime.Now.ToString() + " " + Request.Host.ToString());
            return CreatedAtAction("GetSlots", new { id = slots.venueid }, slots);
        }

        // DELETE: api/Slot/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlots(int id)
        {
            var slots = await _context.slots.FindAsync(id);
            if (slots == null)
            {
                return NotFound();
            }

            _context.slots.Remove(slots);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlotsExists(int id)
        {
            return _context.slots.Any(e => e.slotno == id);
        }
        // GET: api/venues/{venueId}/slots
        [HttpGet("venues/{venueId}")]
        public async Task<ActionResult<List<Slots>>> GetSlotsByVenueId(string venueId)
        {
            var slots = await _context.slots.Where(s => s.venueid == venueId).ToListAsync();
            if (slots == null || !slots.Any())
                return NotFound();
            return slots;
        }

        // DELETE: api/venues/{venueId}/slots
        [HttpDelete("venues/{venueId}")]
        /*public async Task<IActionResult> DeleteSlotsByVenueId(string venueId)
        {
            _logger.LogInformation($"Trying to delete slots with venueId: '{venueId}'");

            var slots = await _context.slots
                .Where(s => s.venueid != null &&
                    s.venueid.Trim().ToLower() == venueId.Trim().ToLower())
                .ToListAsync();

            _logger.LogInformation($"Found {slots.Count} slots to delete.");

            if (!slots.Any())
                return NotFound();

            _context.slots.RemoveRange(slots);
            await _context.SaveChangesAsync();
            return NoContent();
        }*/



          public async Task<IActionResult> DeleteSlotsByVenueId(string venueId)
          {
              Console.WriteLine("Hit DELETE: venueId = " + venueId);

              var slots = await _context.slots.Where(s => s.venueid == venueId).ToListAsync();
              if (!slots.Any())
                  return NotFound();

              _context.slots.RemoveRange(slots);
              await _context.SaveChangesAsync();
              return NoContent();
          }

        /*DeleteBehavior on slottemp*/
        [HttpDelete]
        [Route("SlotTemp")]
        public IActionResult DeleteSlotTemp(string venueid, string slotdate, string starttime)
        {
            Console.WriteLine("Hit DELETE temp: venueId = " + venueid);

            var parsedDate = DateTime.Parse(slotdate).Date;
            var parsedTime = TimeSpan.Parse(starttime);

            var matchingSlot = _context.SlotTemp
                .AsEnumerable() // switch to in-memory
                .FirstOrDefault(s =>
                    s.venueid == venueid &&
                    DateTime.Parse(s.slotdate).Date == parsedDate &&
                    TimeSpan.Parse(s.starttime) == parsedTime
                );

            if (matchingSlot == null)
            {
                return NotFound("No matching slot found in SlotTemp.");
            }

            _context.SlotTemp.Remove(matchingSlot);
            _context.SaveChanges();

            return NoContent();
        }


        /*For the update of slots columns customer and datetime using the slotno's*/

        [HttpPut("book-multiple")]
        public async Task<IActionResult> BookMultipleSlots([FromBody] SlotBookingRequest request)
        {
            if (request.SlotNos == null || request.SlotNos.Count == 0)
            {
                return BadRequest("No slot numbers provided.");
            }

            var slotsToUpdate = await _context.slots
                .Where(s => request.SlotNos.Contains(s.slotno))
                .ToListAsync();

            if (slotsToUpdate.Count != request.SlotNos.Count)
            {
                return NotFound("Some slots not found.");
            }

            foreach (var slot in slotsToUpdate)
            {
                slot.customerid = request.CustomerId;
                slot.bookingdate = request.BookingDate;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Slots updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating slots: {ex.Message}");
            }
        }




        /* checking for the duplication in the SlotTemp */

        [HttpGet("check-duplicate")]
        public IActionResult CheckDuplicate([FromQuery] string venueid, [FromQuery] string slotdate, [FromQuery] string starttime)
        {
            try
            {
                // Parse once
                var parsedDate = DateTime.Parse(slotdate).Date;
                var parsedTime = TimeSpan.Parse(starttime);

                // Switch to client-side evaluation using AsEnumerable()
                var exists = _context.SlotTemp
                    .AsEnumerable() // everything after this runs in memory
                    .Any(s =>
                        s.venueid == venueid &&
                        DateTime.Parse(s.slotdate).Date == parsedDate &&
                        TimeSpan.Parse(s.starttime) == parsedTime
                    );

                return Ok(new { exists });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = "Invalid input or server error",
                    details = ex.Message
                });
            }
        }





    }
}
