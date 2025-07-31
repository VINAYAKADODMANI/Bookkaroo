using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using VenueServices.Models;

namespace VenueServices.Repository
{
    public class VenueRepository : IVenueRepository
    {
        private readonly IMongoCollection<Venue> _venues;

        public VenueRepository(MongoContext context)
        {
            _venues = context.Venues;
        }

        public async Task<List<Venue>> GetAllAsync()
        {
            return await _venues.Find(_ => true).ToListAsync();
        }

        public async Task<Venue?> GetByIdAsync(string id)
        {
            return await _venues.Find(v => v.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Venue venue)
        {
            await _venues.InsertOneAsync(venue);
        }

        public async Task UpdateAsync(string id, Venue venueIn)
        {
            await _venues.ReplaceOneAsync(v => v.Id == id, venueIn);
        }

        public async Task DeleteAsync(string id)
        {
            await _venues.DeleteOneAsync(v => v.Id == id);
        }
    }
}
