namespace eUni.data.Entities;

public class LecturerBatch
{
    public int LecturerBatchId { get; set; }
    public int LecturerId { get; set; }
    public virtual Lecturer Lecturer { get; set; }
    public int BatchId { get; set; }
    public virtual Batch Batch { get; set; }
    public DateTime  StartDate { get; set; }
}
