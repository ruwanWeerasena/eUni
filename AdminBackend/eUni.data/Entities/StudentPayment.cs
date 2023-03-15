using System.ComponentModel.DataAnnotations;

namespace eUni.data.Entities;

public class StudentPayment
{
    [Key]
    public int PaymentId { get; set; }
    public DateTime? PaymentDate { get; set; }
    public decimal Amount { get; set; }
    public decimal Outstanding{ get; set; }
    public string PaymentMethod { get; set; }
    public string? PaymentConfirmationId { get; set; }
    public string PaymentStatus { get; set; }
    public int StudentId { get; set; }
    public virtual Student? Student {get;set;}
    public int StaffId { get; set; }
    public virtual Staff? Staff {get;set;}
    public int EnrollmentId { get; set; }
    public virtual Enrollment? Enrollment {get;set;}


}
