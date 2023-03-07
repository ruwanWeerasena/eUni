using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eUni.data.Migrations
{
    public partial class AddTitleFieldBatchPaymentShedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "BatchPaymentShedules",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "BatchPaymentShedules");

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
        }
    }
}
