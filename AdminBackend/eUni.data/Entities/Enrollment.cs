using System.ComponentModel.DataAnnotations.Schema;

namespace eUni.data.Entities;

public class Enrollment
{
    public int EnrollmentId { get; set; }
    public string InstallmentMethod { get; set; }
    public DateTime  EnrollmentDate { get; set; }
     [ForeignKey("Batch")]
    public int BatchId { get; set; }
    public virtual Batch? Batch { get; set; }
    [ForeignKey("Staff")]
    public int StaffId { get; set; }
    public virtual Staff? Staff {get;set;}

     [ForeignKey("Student")]
    public int StudentId { get; set; }
    public virtual Student? Student {get;set;}

    //  [ForeignKey("BatchDiscount")]
    public int? BatchDiscountId { get; set; }
    public virtual BatchDiscount? BatchDiscount {get;set;}


}
