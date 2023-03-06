using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class BatchPaymentSheduleRepository : IBatchPaymentSheduleRepository
{
    private readonly EUniDBContext _db;
    public BatchPaymentSheduleRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<BatchPaymentShedule>> GetBatchPaymentShedulesAsync()
    {
        return _db.BatchPaymentShedules.Include(x => x.Batch).ToListAsync();
    }

    public async Task<BatchPaymentShedule?> GetBatchPaymentSheduleByIdAsync(int id)
    {
        return await _db.BatchPaymentShedules.FindAsync(id);
    }

    public async Task<BatchPaymentShedule?> CreateAsync(BatchPaymentShedule b)
    {
        EntityEntry<BatchPaymentShedule> added = await _db.BatchPaymentShedules.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<BatchPaymentShedule?> updateAsync(int id,BatchPaymentShedule b)
    {
        BatchPaymentShedule? old = await _db.BatchPaymentShedules.FindAsync(id);
        if(old != null){
            old.BatchId = b.BatchId;
            old.PaymentDate = b.PaymentDate;
            old.Amount = b.Amount;
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
        BatchPaymentShedule? b = await _db.BatchPaymentShedules.FindAsync(id);
        if(b is null) return null;

        _db.BatchPaymentShedules.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
