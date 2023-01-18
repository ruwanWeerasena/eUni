namespace eUni.data.Entities;

public class Course
{
    public int CourseId { get; set; }
    public string Name { get; set; }
    public string EntryRequirement { get; set; }
    public string AwadingBody { get; set; }
    public string ContactDetail { get; set; }
    public string InformationUrl { get; set; }
    public virtual ICollection<Batch> Batches { get; set; }
}
