using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace VenueServices.Models
{
    public class Venue
    {
        [BsonId]        
        public string? Id { get; set; } = null!; // MongoDB _id
        public string? OwnerId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string City { get; set; } = null!;
        public int Capacity { get; set; }
        public List<string> Amenities { get; set; } = new();
        public List<string> Images { get; set; } = new();
        public string VenueType { get; set; } = null!;
    }
    
}
