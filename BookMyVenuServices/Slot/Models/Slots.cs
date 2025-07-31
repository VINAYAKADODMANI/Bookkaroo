using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Slot.Models
{
    public class Slots
    {

      
        [Key]
        public int slotno { get; set; }
        public string? venueid { get; set; }

        public DateTime? slotdate { get; set; }

        public DateTime? enddate { get; set; }

        public TimeSpan? starttime { get; set; }
        public TimeSpan? endtime { get; set; }

        public int? duration { get; set; }

        public double? rate { get; set; }

        public string? customerid { get; set; }
        public DateTime? bookingdate { get; set; }
    }
}
