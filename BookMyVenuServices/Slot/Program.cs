
using Microsoft.EntityFrameworkCore;
using Serilog;
using Slot.Models;
using Slot.Repository;

namespace Slot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

          
            // Add services to the container.
            builder.Services.AddControllers();

            builder.Services.AddScoped<ISlotRepository, SlotRepository>();
            builder.Services.AddDbContext<AppDBContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            //configuring the serilog package

            var logger = new LoggerConfiguration()
                .WriteTo
                .File("C:\\Users\\i19-labuser227502\\source\\logging\\logging.log", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            builder.Services.AddSerilog(logger);

            var app = builder.Build();
            app.UseCors((options) =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });
            // Configure the HTTP request pipeline.
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
