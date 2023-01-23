using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBatchRepository
{
    Task<List<Batch>> GetBatchesAsync();
}
