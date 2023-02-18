namespace eUni.data.Entities;

public class Staff
{
    public int StaffId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public DateTime  DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    public virtual ICollection<StudentPayment>? StudentPayments { get; set; }
}
