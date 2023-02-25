using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface ICourseRepository
{
    Task<List<Course>> GetCoursesAsync();
    Task<Course?> GetCourseByIdAsync(int id);
    Task<Course?> CreateAsync(Course b);
    Task<Course?> updateAsync(int id,Course b);
    Task<bool?> DeletAsync(int id);
}