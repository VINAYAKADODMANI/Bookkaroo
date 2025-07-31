
using System.ComponentModel.DataAnnotations;

namespace Slot.Models
{
    public class SlotTemp
    {
       /* venueid INT,
    startdate DATE,         -- starting day for slot generation
    todate DATE,           -- ending day(inclusive)
    starttime TIME,         -- slot start time on each day
    endtime TIME,           -- slot end time on each day
    duration INT,           -- duration of each slot in minutes
    rate FLOAT*/
        [Key]
        public int SlotId {  get; set; }
        public string venueid { get; set; }
        public string slotdate { get; set; } 
        public string todate { get; set; }// use string for JSON compatibility
        public string starttime { get; set; }
        public string endtime { get; set; }
        public int duration { get; set; }
        public double rate {  get; set; }

        
    }
}
