using Microsoft.AspNetCore.Mvc;
using Slot.Controllers;
using Moq;
using Slot.Models;
using Slot.Repository;

namespace SlotServiceTest
{
    public class Tests
    {
        SlotController _slotController;
        [SetUp]
       

        [Test]
        public void TestGetSlotsPositive()
        {
            var mockrepo = new Mock<AppDBContext>();
            _slotController = new SlotController(mockrepo.Object, null);
            var result = _slotController.Getslots();
            Assert.That(result, Is.Not.Null);
            /*Assert.That(_slotController.Getslots().Result, Is.AssignableFrom<ActionResult>());*/
        }
    }
}