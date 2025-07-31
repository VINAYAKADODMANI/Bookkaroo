using Slot.Models;

namespace Slot.Repository
{
    public class SlotRepository : ISlotRepository
    {
        private readonly AppDBContext _dbContext;
        public SlotRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool AddSlots(SlotTemp slot)
        {
            try
            {
                _dbContext.Add(slot);
                _dbContext.SaveChanges();
                
            }
            catch { return false; }
            return true;
        }

        public bool DeleteSlots(int slotno)
        {
            try
            {
                var Delete_Slot = _dbContext.slots.Find(slotno);
                if (Delete_Slot != null) {
                    _dbContext.Remove(slotno);
                    _dbContext.SaveChanges();
                }
            }catch { return false; }
             return true ;
        }

        public List<Slots> GetSlot(int slotno)
        {
            try
            {
                return _dbContext.slots
                          .Where(s => s.slotno == slotno)
                          .ToList();
            }
            catch { return new List<Slots>(); }
        }

        public List<Slots> GetSlots()
        {
            try
            {
                return _dbContext.slots.ToList();
            }
            catch { return new List<Slots>(); }
        }

        /*public bool SlotsExists(int slotno)
        {
            throw new NotImplementedException();
        }*/

        public bool UpdateSlot(int slotno, Slots slot)
        {
            var existing_slot = _dbContext.slots.Find(slotno);
            if (existing_slot == null)
            {
                return false;
            }
            existing_slot.duration = slot.duration; 
            existing_slot.starttime = slot.starttime;
            existing_slot.endtime= slot.endtime;
            existing_slot.slotdate = slot.slotdate;
            //existing_slot.customerid = slot.customerid;
            existing_slot.rate = slot.rate;
            //existing_slot.venueid = slot.venueid;
            return true;
        }

      
    }
}
