using eUni.data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eUni.data;

public class EUniDBContext : DbContext
{
    public EUniDBContext()
    {

    }

    public EUniDBContext(DbContextOptions<EUniDBContext> options) : base(options)
    {

    }

    public DbSet<Batch> Batchs { get; set; }
    public DbSet<BatchDiscount> BatchDiscounts { get; set; }
    public DbSet<BatchPaymentShedule> BatchPaymentShedules { get; set; }
    public DbSet<BatchTimeShedule> BatchTimeShedules { get; set; }
    public DbSet<Branch> Branchs { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Lecturer> Lecturers { get; set; }
    public DbSet<Staff> Staffs { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<StudentPayment> StudentPayments { get; set; }
    public DbSet<LecturerBatch> LecturerBatches { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LecturerBatch>()
                .HasOne(bc => bc.Batch)
                .WithMany(b => b.LecturerBatches)
                .HasForeignKey(bc => bc.BatchId)
                .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<LecturerBatch>()
                .HasOne(bc => bc.Lecturer)
                .WithMany(b => b.LecturerBatches)
                .HasForeignKey(bc => bc.LecturerId)
                .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Staff>()
            .HasMany(s => s.StudentPayments)
            .WithOne(s => s.Staff)
            .HasForeignKey(fk => fk.StaffId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Student>()
            .HasMany(s => s.StudentPayments)
            .WithOne(s => s.Student)
            .HasForeignKey(fk => fk.StudentId)
            .OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Enrollment>()
            .HasIndex(e => new {e.StudentId , e.BatchId}).IsUnique();

        SeedBranches(modelBuilder);
        SeedStaff(modelBuilder);
        SeedCourses(modelBuilder);
        SeedLecturers(modelBuilder);
        //SeedBatches(modelBuilder);
        SeedStudents(modelBuilder);
        SeedBatchDiscounts(modelBuilder);
        SeedEnrollments(modelBuilder);
    }

    public void SeedBranches(ModelBuilder modelBuilder)
    {
        Branch weliveriya = new()
        {
            BranchId = 1,
            Name = "Weliveriya Branch",
            Address = "43 Main Street Weliveriya",
            Email = "weliveriya@euni.com",
            ContactNumber = "0332255123",
            ContactPerson = "Ajith Perera",

        };

        Branch polonnaruwa = new()
        {
            BranchId = 2,
            Name = "Polonnaruwa Branch",
            Address = "43 Parakrama Mawatha Polonnaruwa",
            Email = "polonnaruwa@euni.com",
            ContactNumber = "0452255123",
            ContactPerson = "Tharindu Ilangakoon"
        };

        modelBuilder.Entity<Branch>()
            .HasData(weliveriya, polonnaruwa);
    }
    public void SeedStaff(ModelBuilder modelBuilder)
    {
        Staff ajith = new()
        {
            StaffId = 1,
            Name = "Ajith Perera",
            DateOfBirth = new(1983, 02, 06),
            Address = "125 Bandarawatha Gampaha",
            Email = "ajith@euni.com",
            Mobile = "0771234562"
        };

        Staff tharindu = new()
        {
            StaffId = 2,
            Name = "Tharindu Ilangakon",
            DateOfBirth = new(1988, 04, 06),
            Address = "34 Gannoruwa Kandy",
            Email = "tharindu@euni.com",
            Mobile = "0711234345"
        };

        modelBuilder.Entity<Staff>()
            .HasData(ajith, tharindu);
    }
    public void SeedCourses(ModelBuilder modelBuilder)
    {
        Course react = new()
        {
            CourseId = 1,
            Name = "React",
            AwadingBody = "Facebook",
            ContactDetail = "Ajith Perera",
            EntryRequirement = "A/L Maths/Bio/Tech",
            InformationUrl = "www.facebook.com/react"
        };

        Course dotnet = new()
        {
            CourseId = 2,
            Name = ".Net 6 with C# 10",
            AwadingBody = "Microsoft",
            ContactDetail = "Ajith Perera",
            EntryRequirement = "A/L Maths/Bio/Tech",
            InformationUrl = "www.microsoft.com/dotnet"
        };

        modelBuilder.Entity<Course>()
        .HasData(react, dotnet);
    }
    public void SeedLecturers(ModelBuilder modelBuilder)
    {
        Lecturer saman = new()
        {
            LecturerId = 1,
            Name = "Saman Jayamaha",
            Address = "45 Samagi Mawatha Biyagama",
            DateOfBirth = new(1990, 02, 05),
            Email = "saman@euni.com",
            Mobile = "0777456324"
        };

        Lecturer nimal = new()
        {
            LecturerId = 2,
            Name = "Nimal Madawala",
            Address = "5 Yayagaga Polonnaruwa",
            DateOfBirth = new(1995, 02, 08),
            Email = "nimal@euni.com",
            Mobile = "0789234543"
        };

        modelBuilder.Entity<Lecturer>()
            .HasData(saman, nimal);
    }
    public void SeedBatches(ModelBuilder modelBuilder)
    {
        Batch weliveriya_react_2022 = new()
        {
            BatchId = 1,
            BranchId = 1,
            CourseId = 1,
            Name = "Weliveriya/React",
            InchargeLecturerId = 1,
            InchargeStaffId = 1,
            StartDate = new(2022, 01, 05),
            EndDate = new(2022, 12, 19),
            Fee = 10000
        };

        Batch weliveriya_dotnet_2022 = new()
        {
            BatchId = 2,
            BranchId = 1,
            CourseId = 2,
            Name = "Weliveriya/Dotnet",
            InchargeLecturerId = 1,
            InchargeStaffId = 1,
            StartDate = new(2022, 01, 05),
            EndDate = new(2022, 12, 19),
            Fee = 15000
        };

        Batch polonnaruwa_react_2022 = new()
        {
            BatchId = 3,
            BranchId = 2,
            CourseId = 1,
            Name = "Polonnaruwa/React",
            InchargeLecturerId = 2,
            InchargeStaffId = 2,
            StartDate = new(2022, 01, 05),
            EndDate = new(2022, 12, 19),
            Fee = 12000
        };

        Batch polonnaruwa_dotnet_2022 = new()
        {
            BatchId = 4,
            BranchId = 2,
            CourseId = 2,
            Name = "Polonnaruwa/Dotnet",
            InchargeLecturerId = 2,
            InchargeStaffId = 2,
            StartDate = new(2022, 01, 05),
            EndDate = new(2022, 12, 19),
            Fee = 18000
        };

        modelBuilder.Entity<Batch>()
            .HasData(weliveriya_react_2022, weliveriya_dotnet_2022, polonnaruwa_react_2022, polonnaruwa_dotnet_2022);
    }
    public void SeedStudents(ModelBuilder modelBuilder)
    {
        Student aviska = new()
        {
            StudentId = 1,
            Name = "Avishka Fernando",
            Street = "12 Rantharu",
            City = "Moratuwa",
            State = "Western",
            DateOfBirth = new(1991, 3, 4),
            Email = "avishka@euni.com",
            Mobile = "0777345621"
        };

        Student pathum = new()
        {
            StudentId = 2,
            Name = "Pathum Nissanka",
            Street = "76 Jawagaga",
            City = "Kaluthara",
            State = "Western",
            DateOfBirth = new(1991, 5, 5),
            Email = "pathum@euni.com",
            Mobile = "0777675621"
        };

        Student kusal = new()
        {
            StudentId = 3,
            Name = "Kusal Mendis",
            Street = "12 Jude Mawatha",
            City = "Katubade",
            State = "Western",
            DateOfBirth = new(1989, 7, 5),
            Email = "kusal@euni.com",
            Mobile = "0777675621"
        };

        Student dananjaya = new()
        {
            StudentId = 4,
            Name = "Dananjaya Desilva",
            Street = "8 Barawakubuka",
            City = "Maharagama",
            State = "Western",
            DateOfBirth = new(1989, 9, 5),
            Email = "dananjaya@euni.com",
            Mobile = "0777678721"
        };

        Student banuka = new()
        {
            StudentId = 5,
            Name = "Banuka Rajepaksha",
            Street = "34 Kokila Lane",
            City = "Kalaniya",
            State = "Western",
            DateOfBirth = new(1988, 9, 22),
            Email = "banuka@euni.com",
            Mobile = "0777678721"
        };

        Student dasun = new()
        {
            StudentId = 6,
            Name = "Dasun Shanka",
            Street = "67 Oliyamula",
            City = "Negambo",
            State = "Western",
            DateOfBirth = new(1989, 4, 21),
            Email = "dasun@euni.com",
            Mobile = "0777668721"
        };

        Student chamika = new()
        {
            StudentId = 7,
            Name = "Chamika Karunarathna",
            Street = "66 New Town",
            City = "Ambalangoda",
            State = "Western",
            DateOfBirth = new(1990, 2, 5),
            Email = "chamika@euni.com",
            Mobile = "0712678721"
        };

        Student wanidu = new()
        {
            StudentId = 8,
            Name = "Wanidu Hasaranga",
            Street = "44 Sewana Lane",
            City = "Galle",
            State = "Southern",
            DateOfBirth = new(1989, 4, 6),
            Email = "wanidu@euni.com",
            Mobile = "0677678721"
        };

        Student mahesh = new()
        {
            StudentId = 9,
            Name = "Mahesh Thikshana",
            Street = "12 kaburupitiya",
            City = "Kotahena",
            State = "Western",
            DateOfBirth = new(1987, 9, 5),
            Email = "mahesh@euni.com",
            Mobile = "0788678721"
        };

        Student kasun = new()
        {
            StudentId = 10,
            Name = "Kasun Rajith",
            Street = "43 Uswatha",
            City = "Marawila",
            State = "Wayaba",
            DateOfBirth = new(1989, 8, 5),
            Email = "kasun@euni.com",
            Mobile = "0777147721"
        };

        modelBuilder.Entity<Student>()
            .HasData(aviska, pathum, kusal, dananjaya, banuka, dasun, chamika, wanidu, mahesh, kasun);
    }
    public void SeedBatchDiscounts(ModelBuilder modelBuilder)
    {
        BatchDiscount dotnetUniWeliveriya = new()
        {
            BatchDiscountId = 1,
            BatchId = 2,
            Criteria = "Who get 80 Marks for React Test",
            DiscountType = "PERCENTAGE",
            Percentage = 25,
            Amount = 0
        };

        BatchDiscount dotnetUniPolonnaruwa = new()
        {
            BatchDiscountId = 2,
            BatchId = 4,
            Criteria = "Who get 80 Marks for React Test",
            DiscountType = "PERCENTAGE",
            Percentage = 25,
            Amount = 0
        };

        modelBuilder.Entity<BatchDiscount>()
            .HasData(dotnetUniWeliveriya, dotnetUniPolonnaruwa);
    }
    public void SeedEnrollments(ModelBuilder modelBuilder)
    {
        Enrollment reactWeliveriyaAviska = new()
        {
            EnrollmentId = 1,
            BatchId = 1,
            StaffId = 1,
            StudentId = 1,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment reactWeliveriyaPathum = new()
        {
            EnrollmentId = 2,
            BatchId = 1,
            StaffId = 1,
            StudentId = 2,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment reactPolonnaruwaKusal = new()
        {
            EnrollmentId = 3,
            BatchId = 2,
            StaffId = 1,
            StudentId = 3,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment reactPolonnaruwaDananjaya = new()
        {
            EnrollmentId = 4,
            BatchId = 2,
            StaffId = 1,
            StudentId = 4,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment dotnetWeliveriyaBanuka = new()
        {
            EnrollmentId = 5,
            BatchId = 3,
            StaffId = 1,
            StudentId = 5,
            EnrollmentDate = DateTime.Now,
            BatchDiscountId=1,
            InstallmentMethod="Cash"
        };

        Enrollment dotnetWeliveriyaDasun = new()
        {
            EnrollmentId = 6,
            BatchId = 3,
            StaffId = 1,
            StudentId = 6,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment dotnetWeliveriyaChamika = new()
        {
            EnrollmentId = 7,
            BatchId = 3,
            StaffId = 1,
            StudentId = 7,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Card"
        };

        Enrollment dotnetPolonnaruwaWanidu = new()
        {
            EnrollmentId = 8,
            BatchId = 4,
            StaffId = 1,
            StudentId = 8,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Cash"
        };

        Enrollment dotnetPolonnaruwaMahesh = new()
        {
            EnrollmentId = 9,
            BatchId = 4,
            StaffId = 1,
            StudentId = 9,
            EnrollmentDate = DateTime.Now,
            InstallmentMethod="Card"
        };

        Enrollment dotnetPolonnaruwaKasun = new()
        {
            EnrollmentId = 10,
            BatchId = 4,
            StaffId = 1,
            StudentId = 10,
            EnrollmentDate = DateTime.Now,
            BatchDiscountId=2,
            InstallmentMethod="Cash"
        };

        modelBuilder.Entity<Enrollment>()
            .HasData(reactWeliveriyaAviska, reactWeliveriyaPathum, reactPolonnaruwaKusal, reactPolonnaruwaDananjaya
            ,dotnetWeliveriyaBanuka, dotnetWeliveriyaDasun, dotnetWeliveriyaChamika,dotnetPolonnaruwaWanidu
            ,dotnetPolonnaruwaMahesh, dotnetPolonnaruwaKasun);
    }
}

