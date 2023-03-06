﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using eUni.data;

#nullable disable

namespace eUni.data.Migrations
{
    [DbContext(typeof(EUniDBContext))]
    [Migration("20230303143436_enrommentmakeunique")]
    partial class enrommentmakeunique
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("eUni.data.Entities.Batch", b =>
                {
                    b.Property<int>("BatchId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BatchId"), 1L, 1);

                    b.Property<int>("BranchId")
                        .HasColumnType("int");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("InchargeLecturerId")
                        .HasColumnType("int");

                    b.Property<int>("InchargeStaffId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("BatchId");

                    b.HasIndex("BranchId");

                    b.HasIndex("CourseId");

                    b.HasIndex("InchargeLecturerId");

                    b.HasIndex("InchargeStaffId");

                    b.ToTable("Batchs");

                    b.HasData(
                        new
                        {
                            BatchId = 1,
                            BranchId = 1,
                            CourseId = 1,
                            EndDate = new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            InchargeLecturerId = 1,
                            InchargeStaffId = 1,
                            Name = "Weliveriya/React",
                            StartDate = new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            BatchId = 2,
                            BranchId = 1,
                            CourseId = 2,
                            EndDate = new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            InchargeLecturerId = 1,
                            InchargeStaffId = 1,
                            Name = "Weliveriya/Dotnet",
                            StartDate = new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            BatchId = 3,
                            BranchId = 2,
                            CourseId = 1,
                            EndDate = new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            InchargeLecturerId = 2,
                            InchargeStaffId = 2,
                            Name = "Polonnaruwa/React",
                            StartDate = new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            BatchId = 4,
                            BranchId = 2,
                            CourseId = 2,
                            EndDate = new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            InchargeLecturerId = 2,
                            InchargeStaffId = 2,
                            Name = "Polonnaruwa/Dotnet",
                            StartDate = new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.BatchDiscount", b =>
                {
                    b.Property<int>("BatchDiscountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BatchDiscountId"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("BatchId")
                        .HasColumnType("int");

                    b.Property<string>("Criteria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DiscountType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Percentage")
                        .HasColumnType("real");

                    b.HasKey("BatchDiscountId");

                    b.HasIndex("BatchId");

                    b.ToTable("BatchDiscounts");

                    b.HasData(
                        new
                        {
                            BatchDiscountId = 1,
                            Amount = 0m,
                            BatchId = 2,
                            Criteria = "Who get 80 Marks for React Test",
                            DiscountType = "PERCENTAGE",
                            Percentage = 25f
                        },
                        new
                        {
                            BatchDiscountId = 2,
                            Amount = 0m,
                            BatchId = 4,
                            Criteria = "Who get 80 Marks for React Test",
                            DiscountType = "PERCENTAGE",
                            Percentage = 25f
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.BatchPaymentShedule", b =>
                {
                    b.Property<int>("BatchPaymentSheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BatchPaymentSheduleId"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("BatchId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.HasKey("BatchPaymentSheduleId");

                    b.HasIndex("BatchId");

                    b.ToTable("BatchPaymentShedules");
                });

            modelBuilder.Entity("eUni.data.Entities.BatchTimeShedule", b =>
                {
                    b.Property<int>("BatchTimeSheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BatchTimeSheduleId"), 1L, 1);

                    b.Property<int>("BatchId")
                        .HasColumnType("int");

                    b.Property<string>("Day")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("EndTime")
                        .HasColumnType("real");

                    b.Property<float>("StartTime")
                        .HasColumnType("real");

                    b.HasKey("BatchTimeSheduleId");

                    b.HasIndex("BatchId");

                    b.ToTable("BatchTimeShedules");
                });

            modelBuilder.Entity("eUni.data.Entities.Branch", b =>
                {
                    b.Property<int>("BranchId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BranchId"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPerson")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BranchId");

                    b.ToTable("Branchs");

                    b.HasData(
                        new
                        {
                            BranchId = 1,
                            Address = "43 Main Street Weliveriya",
                            ContactNumber = "0332255123",
                            ContactPerson = "Ajith Perera",
                            Email = "weliveriya@euni.com",
                            Name = "Weliveriya Branch"
                        },
                        new
                        {
                            BranchId = 2,
                            Address = "43 Parakrama Mawatha Polonnaruwa",
                            ContactNumber = "0452255123",
                            ContactPerson = "Tharindu Ilangakoon",
                            Email = "polonnaruwa@euni.com",
                            Name = "Polonnaruwa Branch"
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CourseId"), 1L, 1);

                    b.Property<string>("AwadingBody")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactDetail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EntryRequirement")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InformationUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CourseId");

                    b.ToTable("Courses");

                    b.HasData(
                        new
                        {
                            CourseId = 1,
                            AwadingBody = "Facebook",
                            ContactDetail = "Ajith Perera",
                            EntryRequirement = "A/L Maths/Bio/Tech",
                            InformationUrl = "www.facebook.com/react",
                            Name = "React"
                        },
                        new
                        {
                            CourseId = 2,
                            AwadingBody = "Microsoft",
                            ContactDetail = "Ajith Perera",
                            EntryRequirement = "A/L Maths/Bio/Tech",
                            InformationUrl = "www.microsoft.com/dotnet",
                            Name = ".Net 6 with C# 10"
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.Enrollment", b =>
                {
                    b.Property<int>("EnrollmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EnrollmentId"), 1L, 1);

                    b.Property<int?>("BatchDiscountId")
                        .HasColumnType("int");

                    b.Property<int?>("BatchId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EnrollmentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("InstallmentMethod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StaffId")
                        .HasColumnType("int");

                    b.Property<int?>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("EnrollmentId");

                    b.HasIndex("BatchDiscountId");

                    b.HasIndex("BatchId");

                    b.HasIndex("StaffId");

                    b.HasIndex("StudentId", "BatchId")
                        .IsUnique()
                        .HasFilter("[StudentId] IS NOT NULL AND [BatchId] IS NOT NULL");

                    b.ToTable("Enrollments");

                    b.HasData(
                        new
                        {
                            EnrollmentId = 1,
                            BatchId = 1,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6482),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 1
                        },
                        new
                        {
                            EnrollmentId = 2,
                            BatchId = 1,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6491),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 2
                        },
                        new
                        {
                            EnrollmentId = 3,
                            BatchId = 2,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6492),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 3
                        },
                        new
                        {
                            EnrollmentId = 4,
                            BatchId = 2,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6493),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 4
                        },
                        new
                        {
                            EnrollmentId = 5,
                            BatchDiscountId = 1,
                            BatchId = 3,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6494),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 5
                        },
                        new
                        {
                            EnrollmentId = 6,
                            BatchId = 3,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6495),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 6
                        },
                        new
                        {
                            EnrollmentId = 7,
                            BatchId = 3,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6496),
                            InstallmentMethod = "Card",
                            StaffId = 1,
                            StudentId = 7
                        },
                        new
                        {
                            EnrollmentId = 8,
                            BatchId = 4,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6497),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 8
                        },
                        new
                        {
                            EnrollmentId = 9,
                            BatchId = 4,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6498),
                            InstallmentMethod = "Card",
                            StaffId = 1,
                            StudentId = 9
                        },
                        new
                        {
                            EnrollmentId = 10,
                            BatchDiscountId = 2,
                            BatchId = 4,
                            EnrollmentDate = new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6499),
                            InstallmentMethod = "Cash",
                            StaffId = 1,
                            StudentId = 10
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.Lecturer", b =>
                {
                    b.Property<int>("LecturerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LecturerId"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LecturerId");

                    b.ToTable("Lecturers");

                    b.HasData(
                        new
                        {
                            LecturerId = 1,
                            Address = "45 Samagi Mawatha Biyagama",
                            DateOfBirth = new DateTime(1990, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "saman@euni.com",
                            Mobile = "0777456324",
                            Name = "Saman Jayamaha"
                        },
                        new
                        {
                            LecturerId = 2,
                            Address = "5 Yayagaga Polonnaruwa",
                            DateOfBirth = new DateTime(1995, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "nimal@euni.com",
                            Mobile = "0789234543",
                            Name = "Nimal Madawala"
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.LecturerBatch", b =>
                {
                    b.Property<int>("LecturerBatchId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LecturerBatchId"), 1L, 1);

                    b.Property<int>("BatchId")
                        .HasColumnType("int");

                    b.Property<int>("LecturerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("LecturerBatchId");

                    b.HasIndex("BatchId");

                    b.HasIndex("LecturerId");

                    b.ToTable("LecturerBatches");
                });

            modelBuilder.Entity("eUni.data.Entities.Staff", b =>
                {
                    b.Property<int>("StaffId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StaffId"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StaffId");

                    b.ToTable("Staffs");

                    b.HasData(
                        new
                        {
                            StaffId = 1,
                            Address = "125 Bandarawatha Gampaha",
                            DateOfBirth = new DateTime(1983, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "ajith@euni.com",
                            Mobile = "0771234562",
                            Name = "Ajith Perera"
                        },
                        new
                        {
                            StaffId = 2,
                            Address = "34 Gannoruwa Kandy",
                            DateOfBirth = new DateTime(1988, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "tharindu@euni.com",
                            Mobile = "0711234345",
                            Name = "Tharindu Ilangakon"
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentId"), 1L, 1);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudentId");

                    b.ToTable("Students");

                    b.HasData(
                        new
                        {
                            StudentId = 1,
                            City = "Moratuwa",
                            DateOfBirth = new DateTime(1991, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "avishka@euni.com",
                            Mobile = "0777345621",
                            Name = "Avishka Fernando",
                            State = "Western",
                            Street = "12 Rantharu"
                        },
                        new
                        {
                            StudentId = 2,
                            City = "Kaluthara",
                            DateOfBirth = new DateTime(1991, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "pathum@euni.com",
                            Mobile = "0777675621",
                            Name = "Pathum Nissanka",
                            State = "Western",
                            Street = "76 Jawagaga"
                        },
                        new
                        {
                            StudentId = 3,
                            City = "Katubade",
                            DateOfBirth = new DateTime(1989, 7, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "kusal@euni.com",
                            Mobile = "0777675621",
                            Name = "Kusal Mendis",
                            State = "Western",
                            Street = "12 Jude Mawatha"
                        },
                        new
                        {
                            StudentId = 4,
                            City = "Maharagama",
                            DateOfBirth = new DateTime(1989, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "dananjaya@euni.com",
                            Mobile = "0777678721",
                            Name = "Dananjaya Desilva",
                            State = "Western",
                            Street = "8 Barawakubuka"
                        },
                        new
                        {
                            StudentId = 5,
                            City = "Kalaniya",
                            DateOfBirth = new DateTime(1988, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "banuka@euni.com",
                            Mobile = "0777678721",
                            Name = "Banuka Rajepaksha",
                            State = "Western",
                            Street = "34 Kokila Lane"
                        },
                        new
                        {
                            StudentId = 6,
                            City = "Negambo",
                            DateOfBirth = new DateTime(1989, 4, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "dasun@euni.com",
                            Mobile = "0777668721",
                            Name = "Dasun Shanka",
                            State = "Western",
                            Street = "67 Oliyamula"
                        },
                        new
                        {
                            StudentId = 7,
                            City = "Ambalangoda",
                            DateOfBirth = new DateTime(1990, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "chamika@euni.com",
                            Mobile = "0712678721",
                            Name = "Chamika Karunarathna",
                            State = "Western",
                            Street = "66 New Town"
                        },
                        new
                        {
                            StudentId = 8,
                            City = "Galle",
                            DateOfBirth = new DateTime(1989, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "wanidu@euni.com",
                            Mobile = "0677678721",
                            Name = "Wanidu Hasaranga",
                            State = "Southern",
                            Street = "44 Sewana Lane"
                        },
                        new
                        {
                            StudentId = 9,
                            City = "Kotahena",
                            DateOfBirth = new DateTime(1987, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "mahesh@euni.com",
                            Mobile = "0788678721",
                            Name = "Mahesh Thikshana",
                            State = "Western",
                            Street = "12 kaburupitiya"
                        },
                        new
                        {
                            StudentId = 10,
                            City = "Marawila",
                            DateOfBirth = new DateTime(1989, 8, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "kasun@euni.com",
                            Mobile = "0777147721",
                            Name = "Kasun Rajith",
                            State = "Wayaba",
                            Street = "43 Uswatha"
                        });
                });

            modelBuilder.Entity("eUni.data.Entities.StudentPayment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PaymentId"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("EnrollmentId")
                        .HasColumnType("int");

                    b.Property<decimal>("Outstanding")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("PaymentConfirmationId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StaffId")
                        .HasColumnType("int");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("PaymentId");

                    b.HasIndex("EnrollmentId");

                    b.HasIndex("StaffId");

                    b.HasIndex("StudentId");

                    b.ToTable("StudentPayments");
                });

            modelBuilder.Entity("eUni.data.Entities.Batch", b =>
                {
                    b.HasOne("eUni.data.Entities.Branch", "Branch")
                        .WithMany("Batches")
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Course", "Course")
                        .WithMany("Batches")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Lecturer", "Lecturer")
                        .WithMany("Batches")
                        .HasForeignKey("InchargeLecturerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("InchargeStaffId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");

                    b.Navigation("Course");

                    b.Navigation("Lecturer");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("eUni.data.Entities.BatchDiscount", b =>
                {
                    b.HasOne("eUni.data.Entities.Batch", "Batch")
                        .WithMany()
                        .HasForeignKey("BatchId");

                    b.Navigation("Batch");
                });

            modelBuilder.Entity("eUni.data.Entities.BatchPaymentShedule", b =>
                {
                    b.HasOne("eUni.data.Entities.Batch", "Batch")
                        .WithMany()
                        .HasForeignKey("BatchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Batch");
                });

            modelBuilder.Entity("eUni.data.Entities.BatchTimeShedule", b =>
                {
                    b.HasOne("eUni.data.Entities.Batch", "Batch")
                        .WithMany()
                        .HasForeignKey("BatchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Batch");
                });

            modelBuilder.Entity("eUni.data.Entities.Enrollment", b =>
                {
                    b.HasOne("eUni.data.Entities.BatchDiscount", "BatchDiscount")
                        .WithMany()
                        .HasForeignKey("BatchDiscountId");

                    b.HasOne("eUni.data.Entities.Batch", "Batch")
                        .WithMany()
                        .HasForeignKey("BatchId");

                    b.HasOne("eUni.data.Entities.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("StaffId");

                    b.HasOne("eUni.data.Entities.Student", "Student")
                        .WithMany("Enrollments")
                        .HasForeignKey("StudentId");

                    b.Navigation("Batch");

                    b.Navigation("BatchDiscount");

                    b.Navigation("Staff");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("eUni.data.Entities.LecturerBatch", b =>
                {
                    b.HasOne("eUni.data.Entities.Batch", "Batch")
                        .WithMany("LecturerBatches")
                        .HasForeignKey("BatchId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Lecturer", "Lecturer")
                        .WithMany("LecturerBatches")
                        .HasForeignKey("LecturerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Batch");

                    b.Navigation("Lecturer");
                });

            modelBuilder.Entity("eUni.data.Entities.StudentPayment", b =>
                {
                    b.HasOne("eUni.data.Entities.Enrollment", "Enrollment")
                        .WithMany()
                        .HasForeignKey("EnrollmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Staff", "Staff")
                        .WithMany("StudentPayments")
                        .HasForeignKey("StaffId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("eUni.data.Entities.Student", "Student")
                        .WithMany("StudentPayments")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Enrollment");

                    b.Navigation("Staff");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("eUni.data.Entities.Batch", b =>
                {
                    b.Navigation("LecturerBatches");
                });

            modelBuilder.Entity("eUni.data.Entities.Branch", b =>
                {
                    b.Navigation("Batches");
                });

            modelBuilder.Entity("eUni.data.Entities.Course", b =>
                {
                    b.Navigation("Batches");
                });

            modelBuilder.Entity("eUni.data.Entities.Lecturer", b =>
                {
                    b.Navigation("Batches");

                    b.Navigation("LecturerBatches");
                });

            modelBuilder.Entity("eUni.data.Entities.Staff", b =>
                {
                    b.Navigation("StudentPayments");
                });

            modelBuilder.Entity("eUni.data.Entities.Student", b =>
                {
                    b.Navigation("Enrollments");

                    b.Navigation("StudentPayments");
                });
#pragma warning restore 612, 618
        }
    }
}
