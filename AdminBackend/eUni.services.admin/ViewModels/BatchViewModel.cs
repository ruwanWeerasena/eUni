namespace eUni.services.admin.ViewModels
{
    public class BatchViewModel
    {
        public int BatchId { get; set; }
        public int CourseId { get; set; }
        public int BranchId { get; set; }
        public int InchargeStaffId { get; set; }
        public int InchargeLecturerId { get; set; }
        public string Name { get; set; }
        public string CourseName { get; set; }
        public string BranchName { get; set; }
        public string StaffName { get; set; }
        public string LecturerName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}