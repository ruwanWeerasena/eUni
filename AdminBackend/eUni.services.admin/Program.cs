using eUni.data;
using eUni.data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
// using Microsoft.Identity.Web;
using static System.Console;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IBatchRepository, BatchRepository>();
builder.Services.AddScoped<IBranchRepository, BranchRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ILecturerRepository, LecturerRepositoy>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
builder.Services.AddCors();

builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration);
builder.Services.AddAuthentication();

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddDbContext<EUniDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddAutoMapper(typeof(Program)); 

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

app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();

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
