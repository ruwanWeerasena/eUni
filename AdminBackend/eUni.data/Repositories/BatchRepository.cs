using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;

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
        return _db.Batchs.ToListAsync();
    }
}
