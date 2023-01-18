namespace eUni.data.Entities;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public DateTime  DateOfBirth { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    // defines a navigation property for related rows
    public virtual ICollection<Enrollment> Enrollments { get; set; }
    public virtual ICollection<StudentPayment> StudentPayments { get; set; }
}
