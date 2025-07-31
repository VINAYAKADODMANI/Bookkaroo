using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;
namespace VenueServices.Filter
{
    public class LogFilter : IActionFilter

    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Log.Logger.Information("Method compelted exectuon");
            Console.WriteLine("Filter is working");
            ;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            Log.Logger.Information("Method starting execution");
            Console.WriteLine("Filter is working");

        }
    }
}
