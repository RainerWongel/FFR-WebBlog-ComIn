using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DbSet.Migrations
{
    /// <inheritdoc />
    public partial class RemovedPostClosFromCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Posts_PostId1",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_PostId1",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "PostId1",
                table: "Categories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PostId1",
                table: "Categories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_PostId1",
                table: "Categories",
                column: "PostId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Posts_PostId1",
                table: "Categories",
                column: "PostId1",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
