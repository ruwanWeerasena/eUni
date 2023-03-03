using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IEnrollmentRepository
{
    Task<List<Enrollment>> GetEnrollmentsAsync();
    Task<List<Enrollment?>> GetEnrollmentsByStudentIdAsync(int id);
    Task<Enrollment?> GetEnrollmentByIdAsync(int id);
    Task<Enrollment?> CreateAsync(Enrollment b);
    Task<bool> CreateMultipleAsync(Enrollment[] e);
    Task<Enrollment?> GetEnrollmentByStudentandBatchAsync(int studentid,int batchid);
    // Task<Batch?> updateAsync(int id,Batch b);
    // Task<bool?> DeletAsync(int id);
}
