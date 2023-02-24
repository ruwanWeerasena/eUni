using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class LecturerRepositoy : ILecturerRepository
{
    private readonly EUniDBContext _db;
    public LecturerRepositoy(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Lecturer>> GetLecturersAsync()
    {
        return _db.Lecturers.ToListAsync();
    }
    public async Task<Lecturer?> GetLecturerByIdAsync(int id)
    {
        return await _db.Lecturers.FindAsync(id);
    }
    public async Task<Lecturer?> CreateAsync(Lecturer b)
    {
        EntityEntry<Lecturer> added = await _db.Lecturers.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<Lecturer?> updateAsync(int id,Lecturer b)
    {
        Lecturer? old = await _db.Lecturers.FindAsync(id);
        if(old != null){
            old.Name = b.Name;
            old.Address = b.Address;
            old.DateOfBirth = b.DateOfBirth;
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
        Lecturer? b = await _db.Lecturers.FindAsync(id);
        if(b is null) return null;

        _db.Lecturers.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
