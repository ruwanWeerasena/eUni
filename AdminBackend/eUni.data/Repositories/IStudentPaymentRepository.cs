using eUni.data.Entities;

namespace eUni.data.Repositories;

public interface IStudentPaymentRepository
{
    Task<List<StudentPayment>> GetStudentPayments();
    Task<List<StudentPayment>> GetStudentPaymentsByStudentIdAsync(int id);
    Task<StudentPayment?> GetStudentPaymentsByIdAsync(int id);
    Task<StudentPayment> CreateAsync(StudentPayment p);
    // Task<Batch?> updateAsync(int id,Batch b);
    // Task<bool?> DeletAsync(int id);
}
