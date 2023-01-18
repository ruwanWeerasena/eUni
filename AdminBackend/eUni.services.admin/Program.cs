using eUni.data;
using Microsoft.EntityFrameworkCore;
using static System.Console;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<EUniDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));



var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/db", async (EUniDBContext db) => {
    bool deleted = await db.Database.EnsureDeletedAsync();
 
 bool created = await db.Database.EnsureCreatedAsync();
 
 WriteLine("SQL script used to create database:");
 WriteLine(db.Database.GenerateCreateScript());

});

app.Run();
