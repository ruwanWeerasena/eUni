using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class BatchRepository : IBatchRepository
{
    private readonly EUniDBContext _db;
    public BatchRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Batch>> GetBatchesAsync()
    {
        return _db.Batchs.Include(b => b.Course)
            .Include(b => b.Branch).Include(b => b.Lecturer).Include(b => b.Staff)
            .ToListAsync();
    }
    public async Task<Batch?> GetBatcheByIdAsync(int id)
    {
        return await _db.Batchs.FindAsync(id);
    }
    public async Task<List<Batch>?> GetBatchesByCourseIdAsync(int id)
    {
        return await _db.Batchs.Where(b=>b.CourseId==id).ToListAsync();
    }
    public async Task<Batch?> CreateAsync(Batch b)
    {
        EntityEntry<Batch> added = await _db.Batchs.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<Batch?> updateAsync(int id,Batch b)
    {
        Batch? old = await _db.Batchs.FindAsync(id);
        if(old != null){
            old.Name = b.Name;
            old.CourseId = b.CourseId;
            old.BranchId = b.BranchId;
            old.InchargeStaffId = b.InchargeStaffId;
            old.InchargeLecturerId=b.InchargeLecturerId;
            old.StartDate=b.StartDate;
            old.EndDate=b.EndDate;
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
        Batch? b = await _db.Batchs.FindAsync(id);
        if(b is null) return null;

        _db.Batchs.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
