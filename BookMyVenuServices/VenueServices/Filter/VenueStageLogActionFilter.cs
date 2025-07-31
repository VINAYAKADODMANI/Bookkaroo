using Microsoft.AspNetCore.Mvc.Filters;

namespace VenueServices.Filter
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class VenueStageLogActionFilter:ActionFilterAttribute
    {
        ILogger<VenueStageLogActionFilter> _logger;
        public VenueStageLogActionFilter(ILogger<VenueStageLogActionFilter> logger)
        {
            _logger = logger;
        }
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation("Log:Action filter executed end");
            Console.WriteLine(context.HttpContext.Request.Method);
            Console.WriteLine(context.HttpContext.Request.QueryString);
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation("LOg:Action filter executed start");
            Console.WriteLine(context.HttpContext.Request.Method);
            Console.WriteLine(context.HttpContext.Request.QueryString);
        }
        public override void OnResultExecuted(ResultExecutedContext context)
        {
            Console.WriteLine("result");
        }
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            Console.WriteLine("result executing");

        }


    }
}
