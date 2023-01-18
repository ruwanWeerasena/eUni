using System.ComponentModel.DataAnnotations.Schema;

namespace eUni.data.Entities;

public class Batch
{
    public int BatchId { get; set; }
    public int CourseId { get; set; }
    public int BranchId { get; set; }
    public int InchargeStaffId { get; set; }
    public string Name { get; set; }
    public DateTime  StartDate { get; set; }
    public DateTime  EndDate { get; set; }
    
    [ForeignKey("Lecturer")]
    public int InchargeLecturerId { get; set; }
    public virtual Lecturer Lecturer { get; set; }
    public virtual Branch Branch { get; set; }
    public virtual Course Course { get; set; }
    public virtual ICollection<LecturerBatch> LecturerBatches { get; set; }
}