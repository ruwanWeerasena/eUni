using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class BatchTimeSheduleRepository : IBatchTimeSheduleRepository
{
    private readonly EUniDBContext _db;
    public BatchTimeSheduleRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<BatchTimeShedule>> GetBatchTimeShedulesAsync()
    {
        return _db.BatchTimeShedules.Include(x => x.Batch).ToListAsync();
    }

    public async Task<BatchTimeShedule?> GetBatchTimeSheduleByIdAsync(int id)
    {
        return await _db.BatchTimeShedules.FindAsync(id);
    }

    public async Task<BatchTimeShedule?> CreateAsync(BatchTimeShedule b)
    {
        EntityEntry<BatchTimeShedule> added = await _db.BatchTimeShedules.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<BatchTimeShedule?> updateAsync(int id,BatchTimeShedule b)
    {
        BatchTimeShedule? old = await _db.BatchTimeShedules.FindAsync(id);
        if(old != null){
            old.BatchId = b.BatchId;
            old.Day = b.Day;
            old.StartTime = b.StartTime;
            old.EndTime = b.EndTime;
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
        BatchTimeShedule? b = await _db.BatchTimeShedules.FindAsync(id);
        if(b is null) return null;

        _db.BatchTimeShedules.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
