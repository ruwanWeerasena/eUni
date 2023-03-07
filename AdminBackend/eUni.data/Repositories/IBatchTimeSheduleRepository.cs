using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBatchTimeSheduleRepository
{
    Task<List<BatchTimeShedule>> GetBatchTimeShedulesAsync();
    Task<BatchTimeShedule?> GetBatchTimeSheduleByIdAsync(int id);
    Task<BatchTimeShedule?> CreateAsync(BatchTimeShedule b);
    Task<BatchTimeShedule?> updateAsync(int id,BatchTimeShedule b);
    Task<bool?> DeletAsync(int id);
}
