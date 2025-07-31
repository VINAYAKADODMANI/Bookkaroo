using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace Slot.Filter
{

    //this will be global filer
    [slotlogFilter]
    public class LogFilter :IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("Action filetr is executing");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Logic after the action executes
            Console.WriteLine("Action filetr is executed");
        }
    }
    
}
