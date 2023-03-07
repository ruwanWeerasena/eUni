using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class BatchDiscountRepository : IBatchDiscountRepository
{
    private readonly EUniDBContext _db;
    public BatchDiscountRepository(EUniDBContext db)
    {
        _db = db;
    }
    public async Task<List<BatchDiscount>> GetBatchDiscountsAsync()
    {
        return await _db.BatchDiscounts.Include(b => b.Batch).ToListAsync();
    }

    public async  Task<List<BatchDiscount>> GetBatchDiscountsByBatchIdAsync(int id)
    {
        return await _db.BatchDiscounts.Where(b=>b.BatchId==id).ToListAsync();
    }

    public async  Task<BatchDiscount?> GetBatchDiscountsByIdAsync(int id)
    {
        return await _db.BatchDiscounts.FindAsync(id);
    }

    public async Task<BatchDiscount?> CreateAsync(BatchDiscount b)
    {
        EntityEntry<BatchDiscount> added = await _db.BatchDiscounts.AddAsync(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return b;
        }

        return null;
    }
    public async Task<BatchDiscount?> updateAsync(int id,BatchDiscount b)
    {
        BatchDiscount? old = await _db.BatchDiscounts.FindAsync(id);
        if(old != null){
            old.BatchId = b.BatchId;
            old.Criteria = b.Criteria;
            old.Amount = b.Amount;
            old.DiscountType = b.DiscountType;
            old.Percentage = b.Percentage;
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
        BatchDiscount? b = await _db.BatchDiscounts.FindAsync(id);
        if(b is null) return null;

        _db.BatchDiscounts.Remove(b);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1) return true;

        return false;
    }
}
