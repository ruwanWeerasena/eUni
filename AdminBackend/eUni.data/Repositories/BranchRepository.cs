using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class BranchRepository : IBranchRepository
{
    private readonly EUniDBContext _db;
    public BranchRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Branch>> GetBranchesAsync()
    {
        return _db.Branchs.ToListAsync();
    }
    public async Task<Branch?> GetBrancheByIdAsync(int id)
    {
        return await _db.Branchs.FindAsync(id);
    }
    public async Task<Branch?> CreateAsync(Branch b)
    {
        EntityEntry<Branch> added = await _db.Branchs.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<Branch?> updateAsync(int id,Branch b)
    {
        Branch? old = await _db.Branchs.FindAsync(id);
        if(old != null){
            old.Name = b.Name;
            old.Address = b.Address;
            old.ContactNumber = b.ContactNumber;
            old.ContactPerson = b.ContactPerson;
            old.Email=b.Email;
            old.Batches=b.Batches;
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
        Branch? b = await _db.Branchs.FindAsync(id);
        if(b is null) return null;

        _db.Branchs.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
