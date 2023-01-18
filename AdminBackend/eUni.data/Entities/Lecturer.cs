using System.ComponentModel.DataAnnotations.Schema;

namespace eUni.data.Entities;

public class Lecturer
{
    public int LecturerId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public DateTime  DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    [ForeignKey("InchargeLecturerId")]
    public virtual ICollection<Batch> Batches { get; set; }
    public virtual ICollection<LecturerBatch> LecturerBatches { get; set; }
}
