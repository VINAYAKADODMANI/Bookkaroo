using Serilog;
using VenueServices.Filter;
using VenueServices.Repository;

namespace VenueServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register your MongoDB context and repository for DI
            builder.Services.AddSingleton<MongoContext>();
            builder.Services.AddScoped<IVenueRepository,VenueRepository>();


            // Add controllers and swagger services
            builder.Services.AddControllers((options) => {
                options.Filters.Add(new LogFilter());
            });//globla action filter
            builder.Services.AddScoped<VenueStageLogActionFilter>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });
            //configuring the serilog package
            var logger=new LoggerConfiguration()
                .WriteTo
                .File(@"C:\Users\Bookkaro\venue.log", rollingInterval:RollingInterval.Day)
                .CreateLogger();
            builder.Services.AddSerilog(logger);

            var app = builder.Build();
            app.UseCors("AllowAngular");
            // Swagger middleware in development
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            


            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
