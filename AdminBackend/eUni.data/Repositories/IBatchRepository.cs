using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBatchRepository
{
    Task<List<Batch>> GetBatchesAsync();
    Task<Batch?> GetBatcheByIdAsync(int id);
    Task<Batch?> CreateAsync(Batch b);
    Task<Batch?> updateAsync(int id,Batch b);
    Task<bool?> DeletAsync(int id);
}
