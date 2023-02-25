using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly EUniDBContext _db;
    public CourseRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Course>> GetCoursesAsync()
    {
        return _db.Courses.ToListAsync();
    }
    public async Task<Course?> GetCourseByIdAsync(int id)
    {
        return await _db.Courses.FindAsync(id);
    }
    public async Task<Course?> CreateAsync(Course b)
    {
        EntityEntry<Course> added = await _db.Courses.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<Course?> updateAsync(int id,Course b)
    {
        Course? old = await _db.Courses.FindAsync(id);
        if(old != null){
            old.Name = b.Name;
            old.ContactDetail = b.ContactDetail;
            old.EntryRequirement = b.EntryRequirement;
            old.AwadingBody = b.AwadingBody;
            old.InformationUrl = b.InformationUrl;
        }

        int affected = await _db.SaveChangesAsync();

        if(affected == 1) 
        {
            return b;
        }else{
        
            return null;
        }

    }
    public async Task<bool?> DeletAsync(int id)
    {
        Course? b = await _db.Courses.FindAsync(id);
        if(b is null) return null;

        _db.Courses.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
