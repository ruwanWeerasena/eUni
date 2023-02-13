using eUni.data;
using eUni.data.Repositories;
using Microsoft.EntityFrameworkCore;
using static System.Console;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IBatchRepository, BatchRepository>();
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<EUniDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EUniDBContext>();
    if (db.Branchs.ToList().Count == 0)
    {
        Console.WriteLine("-----------MIGRAION----------");
        db.Database.Migrate();
    }
}

app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyHeader());

app.MapControllers();

app.MapGet("/", () => "Hello eUni!");

app.MapGet("/db", async (EUniDBContext db) =>
{
    bool deleted = await db.Database.EnsureDeletedAsync();

    bool created = await db.Database.EnsureCreatedAsync();

    WriteLine("SQL script used to create database:");
    WriteLine(db.Database.GenerateCreateScript());

});

app.Run();
