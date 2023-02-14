using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBranchRepository
{
    Task<List<Branch>> GetBranchesAsync();
    Task<Branch?> GetBrancheByIdAsync(int id);
    Task<Branch?> CreateAsync(Branch b);
    Task<Branch?> updateAsync(int id,Branch b);
    Task<bool?> DeletAsync(int id);
}
