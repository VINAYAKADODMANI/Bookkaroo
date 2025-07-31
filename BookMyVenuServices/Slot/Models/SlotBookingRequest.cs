namespace Slot.Models
{
    public class SlotBookingRequest
    {
        public List<int> SlotNos { get; set; } = new();
        public string CustomerId { get; set; } = string.Empty;
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
    }
}
