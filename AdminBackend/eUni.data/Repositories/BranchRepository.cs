using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eUni.data.Repositories;

public class BranchRepository : IBranchRepository
{
    private readonly EUniDBContext _db;
    public BranchRepository(EUniDBContext db)
    {
        _db = db;
    }
    public Task<List<Branch>> GetBranchesAsync()
    {
        return _db.Branchs.ToListAsync();
    }
}
