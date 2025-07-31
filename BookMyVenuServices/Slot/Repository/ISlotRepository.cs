using Slot.Models;

namespace Slot.Repository
{
    public interface ISlotRepository
    {
        bool AddSlots(SlotTemp slot);
        /*bool SlotsExists(int slotno);*/
        
        bool DeleteSlots(int slotno);
        List<Slots> GetSlot(int slotno);
        List<Slots> GetSlots();
        bool UpdateSlot(int slotno, Slots slot);
    }
}
