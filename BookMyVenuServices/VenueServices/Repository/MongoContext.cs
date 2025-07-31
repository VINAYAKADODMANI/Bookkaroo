using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using VenueServices.Models;

namespace VenueServices.Repository
{
    public class MongoContext
    {
        private readonly IMongoDatabase _database;

        public MongoContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Dbconnection");
            var mongoUrl = new MongoUrl(connectionString);
            var client = new MongoClient(mongoUrl);
            _database = client.GetDatabase(mongoUrl.DatabaseName);
        }

        public IMongoCollection<Venue> Venues => _database.GetCollection<Venue>("Venueservices");
    }
}
