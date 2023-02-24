using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly EUniDBContext _db;
    public StudentRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Student>> GetStudentsAsync()
    {
        return _db.Students.ToListAsync();
    }
    public async Task<Student?> GetStudentByIdAsync(int id)
    {
        return await _db.Students.FindAsync(id);
    }
    public async Task<Student?> CreateAsync(Student b)
    {
        EntityEntry<Student> added = await _db.Students.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<Student?> updateAsync(int id,Student b)
    {
        Student? old = await _db.Students.FindAsync(id);
        if(old != null){
            old.Name = b.Name;
            old.DateOfBirth = b.DateOfBirth;
            old.Street = b.Street;
            old.City = b.City;
            old.State=b.State;
            old.Email=b.Email;
            old.Mobile=b.Mobile;
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
        Student? b = await _db.Students.FindAsync(id);
        if(b is null) return null;

        _db.Students.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
