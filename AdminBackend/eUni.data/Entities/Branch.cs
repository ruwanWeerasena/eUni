namespace eUni.data.Entities;

public class Branch
{
    public int BranchId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string ContactNumber { get; set; }
    public string ContactPerson { get; set; }
    public virtual ICollection<Batch> Batches { get; set; }
}
