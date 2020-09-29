using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedValeus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "name" },
                values: new object[] { 1, "Valeu 101" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "name" },
                values: new object[] { 2, "Valeu 102" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "name" },
                values: new object[] { 3, "Valeu 103" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
