using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eUni.data.Migrations
{
    public partial class AddFeeColumntoBatch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                            name: "Fee",
                            table: "Batchs",
                            type: "decimal(18,2)",
                            nullable: true);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 1,
                column: "Fee",
                value: 10000m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 2,
                column: "Fee",
                value: 15000m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 3,
                column: "Fee",
                value: 12000m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 4,
                column: "Fee",
                value: 18000m);

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6437));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6446));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6447));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6449));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6452));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6453));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6454));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6455));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 56, 8, 898, DateTimeKind.Local).AddTicks(6456));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 1,
                column: "Fee",
                value: 0m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 2,
                column: "Fee",
                value: 0m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 3,
                column: "Fee",
                value: 0m);

            migrationBuilder.UpdateData(
                table: "Batchs",
                keyColumn: "BatchId",
                keyValue: 4,
                column: "Fee",
                value: 0m);

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 1,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1040));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 2,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1052));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 3,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1054));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 4,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1055));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 5,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1056));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 6,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1058));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 7,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1059));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 8,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1060));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 9,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1061));

            migrationBuilder.UpdateData(
                table: "Enrollments",
                keyColumn: "EnrollmentId",
                keyValue: 10,
                column: "EnrollmentDate",
                value: new DateTime(2023, 3, 13, 22, 52, 12, 798, DateTimeKind.Local).AddTicks(1062));
        }
    }
}
