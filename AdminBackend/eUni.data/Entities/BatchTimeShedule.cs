namespace eUni.data.Entities;

public class BatchTimeShedule
{
    public int BatchTimeSheduleId { get; set; }
    public int BatchId { get; set; }
    public string Day { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public virtual Batch? Batch { get; set; }

}