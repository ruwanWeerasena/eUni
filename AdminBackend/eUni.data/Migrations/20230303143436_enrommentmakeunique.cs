using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eUni.data.Migrations
{
    public partial class enrommentmakeunique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Batchs_BatchId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Staffs_StaffId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Students_StudentId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_StudentId",
                table: "Enrollments");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Enrollments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "Enrollments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "BatchId",
                table: "Enrollments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6482));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6491));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6492));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6493));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6494));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6495));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6496));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6497));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6498));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 3, 20, 4, 35, 91, DateTimeKind.Local).AddTicks(6499));

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_StudentId_BatchId",
                table: "Enrollments",
                columns: new[] { "StudentId", "BatchId" },
                unique: true,
                filter: "[StudentId] IS NOT NULL AND [BatchId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Batchs_InchargeStaffId",
                table: "Batchs",
                column: "InchargeStaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Batchs_Staffs_InchargeStaffId",
                table: "Batchs",
                column: "InchargeStaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Batchs_BatchId",
                table: "Enrollments",
                column: "BatchId",
                principalTable: "Batchs",
                principalColumn: "BatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Staffs_StaffId",
                table: "Enrollments",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Students_StudentId",
                table: "Enrollments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Batchs_Staffs_InchargeStaffId",
                table: "Batchs");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Batchs_BatchId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Staffs_StaffId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Students_StudentId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_StudentId_BatchId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Batchs_InchargeStaffId",
                table: "Batchs");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Enrollments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "Enrollments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BatchId",
                table: "Enrollments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1329));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1339));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1340));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1341));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1342));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1343));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1344));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1345));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1346));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 2, 2, 23, 35, 43, 917, DateTimeKind.Local).AddTicks(1347));

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_StudentId",
                table: "Enrollments",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Batchs_BatchId",
                table: "Enrollments",
                column: "BatchId",
                principalTable: "Batchs",
                principalColumn: "BatchId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Staffs_StaffId",
                table: "Enrollments",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Students_StudentId",
                table: "Enrollments",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
