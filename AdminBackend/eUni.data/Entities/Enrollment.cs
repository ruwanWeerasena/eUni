namespace eUni.data.Entities;

public class Enrollment
{
    public int EnrollmentId { get; set; }
    public string InstallmentMethod { get; set; }
    public DateTime  EnrollmentDate { get; set; }
    public int BatchId { get; set; }
    public virtual Batch Batch { get; set; }
    public int StaffId { get; set; }
    public virtual Staff Staff {get;set;}
    public int StudentId { get; set; }
    public virtual Student Student {get;set;}
    public int? BatchDiscountId { get; set; }
    public virtual BatchDiscount BatchDiscount {get;set;}


}
