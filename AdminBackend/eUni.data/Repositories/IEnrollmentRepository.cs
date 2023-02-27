using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IEnrollmentRepository
{
    Task<List<Enrollment>> GetEnrollmentsAsync();
    Task<List<Enrollment?>> GetEnrollmentsByStudentIdAsync(int id);
    Task<Enrollment?> GetEnrollmentByIdAsync(int id);
    Task<Enrollment?> CreateAsync(Enrollment b);
    // Task<Batch?> updateAsync(int id,Batch b);
    // Task<bool?> DeletAsync(int id);
}
