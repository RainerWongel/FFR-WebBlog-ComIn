using DbSet;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebBlog.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// connection string
builder.Services.AddDbContext<BlogDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = null; //ReferenceHandler.Preserve
    });

builder.Services.AddControllers()
  .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNameCaseInsensitive = true)
  .ConfigureApiBehaviorOptions(options =>
  {
      options.InvalidModelStateResponseFactory = context =>
      {
          Console.WriteLine("ModelState ungültig:");
          foreach (var kvp in context.ModelState)
          {
              foreach (var error in kvp.Value.Errors)
              {
                  Console.WriteLine($" {kvp.Key}: {error.ErrorMessage}");
              }
          }

          return new BadRequestObjectResult(context.ModelState);
      };
  });

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


    builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = ".AspNetCore.Cookies";
        options.LoginPath = "/Login";
        options.LogoutPath = "/Logout";
        options.Cookie.SameSite = SameSiteMode.None; // für CORS-Cookies notwendig
        //options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        //options.Cookie.HttpOnly = true;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins("http://localhost:60648")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});




var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowLocalhost");
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

 app.Run();
