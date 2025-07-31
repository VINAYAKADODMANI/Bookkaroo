using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VenueServices.Models;
using VenueServices.Repository;
using Serilog;
using VenueServices.Filter;
using Microsoft.AspNetCore.Mvc.Filters;

namespace VenueServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [TypeFilter(typeof(VenueStageLogActionFilter))] // Custom action filter for logging
    [ExceptionHandlerFilter] // Custom exception filter for handling exceptions
    public class VenueController : ControllerBase
    {
        private readonly IVenueRepository _repository;
        private readonly ILogger<VenueController> _logger;

        public VenueController(IVenueRepository repository,ILogger<VenueController> logger)
        {
            _repository = repository;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<List<Venue>>> GetAll()
        {
            _logger.LogInformation("Show VenueMethods " +DateTime.Now.ToString()+Request.Host.ToString());
            var venues = await _repository.GetAllAsync();
            return Ok(venues);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Venue>> GetById(string id)
        {
            var venue = await _repository.GetByIdAsync(id);
            if (venue == null)
                return NotFound();

            return Ok(venue);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Venue venue)
        {
            venue.Id= Guid.NewGuid().ToString();
            await _repository.CreateAsync(venue);
            return CreatedAtAction(nameof(GetById), new { id = venue.Id }, venue);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Venue venueIn)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            venueIn.Id = id;
            await _repository.UpdateAsync(id, venueIn);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
