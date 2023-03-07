using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBatchPaymentSheduleRepository
{
    Task<List<BatchPaymentShedule>> GetBatchPaymentShedulesAsync();
    Task<BatchPaymentShedule?> GetBatchPaymentSheduleByIdAsync(int id);
    Task<BatchPaymentShedule?> CreateAsync(BatchPaymentShedule b);
    Task<BatchPaymentShedule?> updateAsync(int id,BatchPaymentShedule b);
    Task<bool?> DeletAsync(int id);
}
