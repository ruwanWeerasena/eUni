namespace eUni.data.Entities;

public class BatchPaymentShedule
{
    public int BatchPaymentSheduleId { get; set; }
    public int BatchId { get; set; }
    public DateTime  PaymentDate { get; set; }
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public virtual Batch Batch { get; set; }
}
