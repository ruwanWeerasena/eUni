using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class StudentPaymentRepository : IStudentPaymentRepository
{
    private readonly EUniDBContext _db;
    public StudentPaymentRepository(EUniDBContext db)
    {
        _db = db;
    }

    public Task<List<StudentPayment>> GetStudentPayments()
    {
        return _db.StudentPayments.ToListAsync();
    }

    public async Task<List<StudentPayment>> GetStudentPaymentsByStudentIdAsync(int id)
    {
        return await _db.StudentPayments.Where(p=>p.StudentId==id).ToListAsync();
    }

    public async Task<StudentPayment> CreateAsync(StudentPayment p)
    {
        EntityEntry<StudentPayment> added = await _db.StudentPayments.AddAsync(p);
        int affected = await _db.SaveChangesAsync();

        if (affected == 1)
        {
            return p;
        }

        return null;
    }

    public async Task<StudentPayment?> GetStudentPaymentsByIdAsync(int id)
    {
        return await _db.StudentPayments.FindAsync(id);
    }



   
}