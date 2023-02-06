using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eUni.data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Branchs",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactPerson = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branchs", x => x.BranchId);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EntryRequirement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AwadingBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactDetail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InformationUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                });

            migrationBuilder.CreateTable(
                name: "Lecturers",
                columns: table => new
                {
                    LecturerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.LecturerId);
                });

            migrationBuilder.CreateTable(
                name: "Staffs",
                columns: table => new
                {
                    StaffId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staffs", x => x.StaffId);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                });

            migrationBuilder.CreateTable(
                name: "Batchs",
                columns: table => new
                {
                    BatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    InchargeStaffId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InchargeLecturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Batchs", x => x.BatchId);
                    table.ForeignKey(
                        name: "FK_Batchs_Branchs_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branchs",
                        principalColumn: "BranchId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Batchs_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Batchs_Lecturers_InchargeLecturerId",
                        column: x => x.InchargeLecturerId,
                        principalTable: "Lecturers",
                        principalColumn: "LecturerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BatchDiscounts",
                columns: table => new
                {
                    BatchDiscountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Criteria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiscountType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percentage = table.Column<float>(type: "real", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BatchId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchDiscounts", x => x.BatchDiscountId);
                    table.ForeignKey(
                        name: "FK_BatchDiscounts_Batchs_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batchs",
                        principalColumn: "BatchId");
                });

            migrationBuilder.CreateTable(
                name: "BatchPaymentShedules",
                columns: table => new
                {
                    BatchPaymentSheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BatchId = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchPaymentShedules", x => x.BatchPaymentSheduleId);
                    table.ForeignKey(
                        name: "FK_BatchPaymentShedules_Batchs_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batchs",
                        principalColumn: "BatchId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BatchTimeShedules",
                columns: table => new
                {
                    BatchTimeSheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BatchId = table.Column<int>(type: "int", nullable: false),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<float>(type: "real", nullable: false),
                    EndTime = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchTimeShedules", x => x.BatchTimeSheduleId);
                    table.ForeignKey(
                        name: "FK_BatchTimeShedules_Batchs_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batchs",
                        principalColumn: "BatchId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LecturerBatches",
                columns: table => new
                {
                    LecturerBatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LecturerId = table.Column<int>(type: "int", nullable: false),
                    BatchId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LecturerBatches", x => x.LecturerBatchId);
                    table.ForeignKey(
                        name: "FK_LecturerBatches_Batchs_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batchs",
                        principalColumn: "BatchId");
                    table.ForeignKey(
                        name: "FK_LecturerBatches_Lecturers_LecturerId",
                        column: x => x.LecturerId,
                        principalTable: "Lecturers",
                        principalColumn: "LecturerId");
                });

            migrationBuilder.CreateTable(
                name: "Enrollments",
                columns: table => new
                {
                    EnrollmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InstallmentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BatchId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    BatchDiscountId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enrollments", x => x.EnrollmentId);
                    table.ForeignKey(
                        name: "FK_Enrollments_BatchDiscounts_BatchDiscountId",
                        column: x => x.BatchDiscountId,
                        principalTable: "BatchDiscounts",
                        principalColumn: "BatchDiscountId");
                    table.ForeignKey(
                        name: "FK_Enrollments_Batchs_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batchs",
                        principalColumn: "BatchId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enrollments_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "StaffId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enrollments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentPayments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Outstanding = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentConfirmationId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    EnrollmentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentPayments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_StudentPayments_Enrollments_EnrollmentId",
                        column: x => x.EnrollmentId,
                        principalTable: "Enrollments",
                        principalColumn: "EnrollmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentPayments_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "StaffId");
                    table.ForeignKey(
                        name: "FK_StudentPayments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId");
                });

            migrationBuilder.InsertData(
                table: "Branchs",
                columns: new[] { "BranchId", "Address", "ContactNumber", "ContactPerson", "Email", "Name" },
                values: new object[,]
                {
                    { 1, "43 Main Street Weliveriya", "0332255123", "Ajith Perera", "weliveriya@euni.com", "Weliveriya Branch" },
                    { 2, "43 Parakrama Mawatha Polonnaruwa", "0452255123", "Tharindu Ilangakoon", "polonnaruwa@euni.com", "Polonnaruwa Branch" }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseId", "AwadingBody", "ContactDetail", "EntryRequirement", "InformationUrl", "Name" },
                values: new object[,]
                {
                    { 1, "Facebook", "Ajith Perera", "A/L Maths/Bio/Tech", "www.facebook.com/react", "React" },
                    { 2, "Microsoft", "Ajith Perera", "A/L Maths/Bio/Tech", "www.microsoft.com/dotnet", ".Net 6 with C# 10" }
                });

            migrationBuilder.InsertData(
                table: "Lecturers",
                columns: new[] { "LecturerId", "Address", "DateOfBirth", "Email", "Mobile", "Name" },
                values: new object[,]
                {
                    { 1, "45 Samagi Mawatha Biyagama", new DateTime(1990, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "saman@euni.com", "0777456324", "Saman Jayamaha" },
                    { 2, "5 Yayagaga Polonnaruwa", new DateTime(1995, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "nimal@euni.com", "0789234543", "Nimal Madawala" }
                });

            migrationBuilder.InsertData(
                table: "Staffs",
                columns: new[] { "StaffId", "Address", "DateOfBirth", "Email", "Mobile", "Name" },
                values: new object[,]
                {
                    { 1, "125 Bandarawatha Gampaha", new DateTime(1983, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "ajith@euni.com", "0771234562", "Ajith Perera" },
                    { 2, "34 Gannoruwa Kandy", new DateTime(1988, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "tharindu@euni.com", "0711234345", "Tharindu Ilangakon" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentId", "City", "DateOfBirth", "Email", "Mobile", "Name", "State", "Street" },
                values: new object[,]
                {
                    { 1, "Moratuwa", new DateTime(1991, 3, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "avishka@euni.com", "0777345621", "Avishka Fernando", "Western", "12 Rantharu" },
                    { 2, "Kaluthara", new DateTime(1991, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "pathum@euni.com", "0777675621", "Pathum Nissanka", "Western", "76 Jawagaga" },
                    { 3, "Katubade", new DateTime(1989, 7, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "kusal@euni.com", "0777675621", "Kusal Mendis", "Western", "12 Jude Mawatha" },
                    { 4, "Maharagama", new DateTime(1989, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "dananjaya@euni.com", "0777678721", "Dananjaya Desilva", "Western", "8 Barawakubuka" },
                    { 5, "Kalaniya", new DateTime(1988, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "banuka@euni.com", "0777678721", "Banuka Rajepaksha", "Western", "34 Kokila Lane" },
                    { 6, "Negambo", new DateTime(1989, 4, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "dasun@euni.com", "0777668721", "Dasun Shanka", "Western", "67 Oliyamula" },
                    { 7, "Ambalangoda", new DateTime(1990, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "chamika@euni.com", "0712678721", "Chamika Karunarathna", "Western", "66 New Town" },
                    { 8, "Galle", new DateTime(1989, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "wanidu@euni.com", "0677678721", "Wanidu Hasaranga", "Southern", "44 Sewana Lane" },
                    { 9, "Kotahena", new DateTime(1987, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "mahesh@euni.com", "0788678721", "Mahesh Thikshana", "Western", "12 kaburupitiya" },
                    { 10, "Marawila", new DateTime(1989, 8, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "kasun@euni.com", "0777147721", "Kasun Rajith", "Wayaba", "43 Uswatha" }
                });

            migrationBuilder.InsertData(
                table: "Batchs",
                columns: new[] { "BatchId", "BranchId", "CourseId", "EndDate", "InchargeLecturerId", "InchargeStaffId", "Name", "StartDate" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, "Weliveriya/React", new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 1, 2, new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1, "Weliveriya/Dotnet", new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 2, 1, new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, "Polonnaruwa/React", new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 2, 2, new DateTime(2022, 12, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, "Polonnaruwa/Dotnet", new DateTime(2022, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "BatchDiscounts",
                columns: new[] { "BatchDiscountId", "Amount", "BatchId", "Criteria", "DiscountType", "Percentage" },
                values: new object[,]
                {
                    { 1, 0m, 2, "Who get 80 Marks for React Test", "PERCENTAGE", 25f },
                    { 2, 0m, 4, "Who get 80 Marks for React Test", "PERCENTAGE", 25f }
                });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "EnrollmentId", "BatchDiscountId", "BatchId", "EnrollmentDate", "InstallmentMethod", "StaffId", "StudentId" },
                values: new object[,]
                {
                    { 1, null, 1, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1329), "Cash", 1, 1 },
                    { 2, null, 1, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1339), "Cash", 1, 2 },
                    { 3, null, 2, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1340), "Cash", 1, 3 },
                    { 4, null, 2, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1341), "Cash", 1, 4 },
                    { 6, null, 3, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1343), "Cash", 1, 6 },
                    { 7, null, 3, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1344), "Card", 1, 7 },
                    { 8, null, 4, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1345), "Cash", 1, 8 },
                    { 9, null, 4, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1346), "Card", 1, 9 }
                });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "EnrollmentId", "BatchDiscountId", "BatchId", "EnrollmentDate", "InstallmentMethod", "StaffId", "StudentId" },
                values: new object[] { 5, 1, 3, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1342), "Cash", 1, 5 });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "EnrollmentId", "BatchDiscountId", "BatchId", "EnrollmentDate", "InstallmentMethod", "StaffId", "StudentId" },
                values: new object[] { 10, 2, 4, new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1347), "Cash", 1, 10 });

            migrationBuilder.CreateIndex(
                name: "IX_BatchDiscounts_BatchId",
                table: "BatchDiscounts",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_BatchPaymentShedules_BatchId",
                table: "BatchPaymentShedules",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Batchs_BranchId",
                table: "Batchs",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Batchs_CourseId",
                table: "Batchs",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Batchs_InchargeLecturerId",
                table: "Batchs",
                column: "InchargeLecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_BatchTimeShedules_BatchId",
                table: "BatchTimeShedules",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_BatchDiscountId",
                table: "Enrollments",
                column: "BatchDiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_BatchId",
                table: "Enrollments",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_StaffId",
                table: "Enrollments",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_StudentId",
                table: "Enrollments",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_LecturerBatches_BatchId",
                table: "LecturerBatches",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_LecturerBatches_LecturerId",
                table: "LecturerBatches",
                column: "LecturerId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPayments_EnrollmentId",
                table: "StudentPayments",
                column: "EnrollmentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPayments_StaffId",
                table: "StudentPayments",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentPayments_StudentId",
                table: "StudentPayments",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BatchPaymentShedules");

            migrationBuilder.DropTable(
                name: "BatchTimeShedules");

            migrationBuilder.DropTable(
                name: "LecturerBatches");

            migrationBuilder.DropTable(
                name: "StudentPayments");

            migrationBuilder.DropTable(
                name: "Enrollments");

            migrationBuilder.DropTable(
                name: "BatchDiscounts");

            migrationBuilder.DropTable(
                name: "Staffs");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Batchs");

            migrationBuilder.DropTable(
                name: "Branchs");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Lecturers");
        }
    }
}
