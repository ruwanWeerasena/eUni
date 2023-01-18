namespace eUni.data.Entities;

public class BatchTimeShedule
{
    public int BatchTimeSheduleId { get; set; }
    public int BatchId { get; set; }
    public string Day { get; set; }
    public float StartTime { get; set; }
    public float EndTime { get; set; }
    public virtual Batch Batch { get; set; }

}