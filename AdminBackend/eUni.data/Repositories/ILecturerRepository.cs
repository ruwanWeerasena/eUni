using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface ILecturerRepository
{
    Task<List<Lecturer>> GetLecturersAsync();
    Task<Lecturer?> GetLecturerByIdAsync(int id);
    Task<Lecturer?> CreateAsync(Lecturer b);
    Task<Lecturer?> updateAsync(int id,Lecturer b);
    Task<bool?> DeletAsync(int id);
}
