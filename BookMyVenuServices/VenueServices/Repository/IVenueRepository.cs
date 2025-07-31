using VenueServices.Models;

namespace VenueServices.Repository
{
    public interface IVenueRepository
    {
        Task CreateAsync(Venue venue);
        Task DeleteAsync(string id);
        Task<List<Venue>> GetAllAsync();
        Task<Venue?> GetByIdAsync(string id);
        Task UpdateAsync(string id, Venue venueIn);
    }
}