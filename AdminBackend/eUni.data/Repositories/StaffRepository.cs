using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class StaffRepository : IStaffRepository
{
    private readonly EUniDBContext _db;
    public StaffRepository(EUniDBContext db)
    {
        _db = db;
    }

    public Task<List<Staff>> GetAllStaffAsync()
    {
        return _db.Staffs.ToListAsync();
    }

    public async Task<Staff?> GetStaffByIdAsync(int id)
    {
        return await _db.Staffs.FindAsync(id);
    }

    public async Task<Staff?> CreateStaffAsync(Staff b)
    {
        EntityEntry<Staff> added = await _db.Staffs.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if (affected == 1)
        {
            return b;
        }

        return null;
    }

    public async Task<bool?> DeletStaffAsync(int id)
    {
        Staff? b = await _db.Staffs.FindAsync(id);
        if (b is null) return null;

        _db.Staffs.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if (affected == 1) return true;

        return false;
    }

    public async Task<Staff?> UpdateStaffAsync(int id, Staff b)
    {
        Staff? old = await _db.Staffs.FindAsync(id);
        if (old != null)
        {
            old.Name = b.Name;
            old.Address = b.Address;
            old.DateOfBirth = b.DateOfBirth;
            old.Email = b.Email;
            old.Mobile = b.Mobile;
        }

        int affected = await _db.SaveChangesAsync();

        if (affected == 1)
        {
            return b;
        }
        else
        {

            return null;
        }
    }
}