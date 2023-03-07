using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eUni.data.Migrations
{
    public partial class AlterBatchTimeShedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "BatchTimeShedules",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<string>(
                name: "EndTime",
                table: "BatchTimeShedules",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3582));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3593));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3595));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3598));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3599));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3600));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3601));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3602));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3603));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 7, 21, 19, 25, 429, DateTimeKind.Local).AddTicks(3604));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "StartTime",
                table: "BatchTimeShedules",
                type: "real",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<float>(
                name: "EndTime",
                table: "BatchTimeShedules",
                type: "real",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7448));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7461));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7463));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7464));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7466));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7467));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7469));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7471));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7472));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 6, 11, 19, 48, 222, DateTimeKind.Local).AddTicks(7474));
        }
    }
}
