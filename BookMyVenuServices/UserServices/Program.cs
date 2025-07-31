using UserServices.Models;
using UserServices.Repository;
using Microsoft.EntityFrameworkCore;
using Serilog;
namespace UserServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
            builder.Services.AddControllers();
            
            builder.Services.AddDbContext<userDbContext>();
            builder.Services.AddScoped<IuserRepository, userRepository>();
            builder.Services.AddDbContext<userDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            //configuring the serilog package
            /*var logger = new LoggerConfiguration().WriteTo
                .File("d:\\Bookkaro\\Bookkaro.log", rollingInterval: RollingInterval.Day)
                .CreateLogger();
            builder.Services.AddSerilog(logger);*/

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors((options) =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });
            
                    
            app.UseCors("AllowAngularApp");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
