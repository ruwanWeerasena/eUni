using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IStudentRepository
{
    Task<List<Student>> GetStudentsAsync();
    Task<Student?> GetStudentByIdAsync(int id);
    Task<Student?> CreateAsync(Student b);
    Task<Student?> updateAsync(int id,Student b);
    Task<bool?> DeletAsync(int id);
}
