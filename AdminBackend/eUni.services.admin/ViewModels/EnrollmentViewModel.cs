namespace eUni.services.admin.ViewModels
{
    public class EnrollmentViewModel
    {
        public int EnrollmentId { get; set; }
        public string InstallmentMethod { get; set; }
        public DateTime  EnrollmentDate { get; set; }
        public int BatchId { get; set; }
        public int StaffId { get; set; }
        public int StudentId { get; set; }
        public int? BatchDiscountId { get; set; }
        public string BatchName { get; set; }
        public string StaffName { get; set; }
        public string StudentName { get; set; }
        public string? BatchDiscountCriteria { get; set; }
        public float? BatchDiscountsPercentage { get; set; }
    }
}