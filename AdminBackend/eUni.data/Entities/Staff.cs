using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using eUni.data.Utils;

namespace eUni.data.Entities;

public class Staff
{
    public int StaffId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    
    [JsonConverter(typeof(DateTimeFormatConverter))]
    public DateTime  DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    public virtual ICollection<StudentPayment>? StudentPayments { get; set; }
}
