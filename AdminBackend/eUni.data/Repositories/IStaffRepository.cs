using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IStaffRepository
{
    Task<List<Staff>> GetAllStaffAsync();
    Task<Staff?> GetStaffByIdAsync(int id);
    Task<Staff?> CreateStaffAsync(Staff b);
    Task<Staff?> UpdateStaffAsync(int id, Staff b);
    Task<bool?> DeletStaffAsync(int id); 
}