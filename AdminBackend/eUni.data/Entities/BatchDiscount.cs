namespace eUni.data.Entities;

public class BatchDiscount
{
    public int BatchDiscountId { get; set; }
    public string Criteria { get; set; }
    public string DiscountType { get; set; }
    public float Percentage { get; set; }
    public decimal Amount { get; set; }
    public int? BatchId { get; set; }
    public virtual Batch Batch { get; set; }

}