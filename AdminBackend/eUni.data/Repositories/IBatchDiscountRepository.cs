using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBatchDiscountRepository
{
    Task<List<BatchDiscount>> GetBatchDiscountsAsync();
    Task<BatchDiscount?> GetBatchDiscountsByIdAsync(int id);
    Task<BatchDiscount?> CreateAsync(BatchDiscount b);
    Task<BatchDiscount?> updateAsync(int id,BatchDiscount b);
    Task<bool?> DeletAsync(int id);
}
