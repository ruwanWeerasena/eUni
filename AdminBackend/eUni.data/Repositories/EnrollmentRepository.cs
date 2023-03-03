using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace eUni.data.Repositories;

public class EnrollmentRepository : IEnrollmentRepository
{
    private readonly EUniDBContext _db;
    public EnrollmentRepository(EUniDBContext db)
    {
        _db = db;
    }
    public async Task<List<Enrollment>> GetEnrollmentsAsync()
    {
        var list = await _db.Enrollments.Include(e => e.Batch)
            .Include(e => e.Staff).Include(e => e.Student).Include(bd=>bd.BatchDiscount)
            .ToListAsync();

           
            return list;
    }
    public async Task<List<Enrollment>> GetEnrollmentsByStudentIdAsync(int id)
    {
        var list = await _db.Enrollments.Where(enrollment => enrollment.StudentId == id).Include(e => e.Batch)
            .Include(e => e.Staff).Include(e => e.Student).Include(e => e.BatchDiscount).ToListAsync();

           

            return list;
    }
    public async Task<Enrollment?> CreateAsync(Enrollment e)
    {
        EntityEntry<Enrollment> added = await _db.Enrollments.AddAsync(e);
        int affected = await _db.SaveChangesAsync();

        if(affected == 1)
        {
            return e;
        }

        return null;
    }

    public async Task<bool> CreateMultipleAsync(Enrollment[] e)
    {
            await _db.Enrollments.AddRangeAsync(e);
        try
        {
            int affected = await _db.SaveChangesAsync();
          
            return true;
        }
        catch (System.Exception)
        {
            Console.WriteLine("----------------------ffff-----");
            
            return false;
        }

    }
    public async Task<Enrollment?> GetEnrollmentByIdAsync(int id)
    {
        Enrollment? e = await _db.Enrollments.FindAsync(id);
        return e;

    }
    public async Task<Enrollment?> GetEnrollmentByStudentandBatchAsync(int studentid,int batchid)
    {
        // .Where(e=> e.StudentId==studentid )
        Enrollment? e = await _db.Enrollments.FirstOrDefaultAsync(enrollment=>enrollment.BatchId==batchid && enrollment.StudentId==studentid);
        return e;

    }
    // public async Task<bool?> DeletAsync(int id)
    // {
    //     Batch? b = await _db.Batchs.FindAsync(id);
    //     if(b is null) return null;

    //     _db.Batchs.Remove(b);
    //     int affected = await _db.SaveChangesAsync();

    //     if(affected == 1) return true;

    //     return false;
    // }
}
