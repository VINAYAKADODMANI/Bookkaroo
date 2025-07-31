using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace Slot.Filter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class slotlogFilter: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context) =>
            // Logic before the action executes
            Console.WriteLine("Slot log filter is executing");
        public override void OnActionExecuted(ActionExecutedContext context) =>
            // Logic after the action executes
            Console.WriteLine("Slot log filter is executed");
        public override void OnResultExecuting(ResultExecutingContext context) =>
            // Logic before the result executes
            Console.WriteLine("Slot log filter is result executing");
        public override void OnResultExecuted(ResultExecutedContext context) =>
            // Logic after the result executes
            Console.WriteLine("Slot log filter is result executed");
    }
}
