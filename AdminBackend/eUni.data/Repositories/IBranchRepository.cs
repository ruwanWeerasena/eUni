using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IBranchRepository
{
    Task<List<Branch>> GetBranchesAsync();
}
