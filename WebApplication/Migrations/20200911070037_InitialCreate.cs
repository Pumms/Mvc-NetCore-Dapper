using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_M_Mahasiswa",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NPM = table.Column<string>(type: "nvarchar(8)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Jenis_Kelamin = table.Column<string>(type: "nvarchar(12)", nullable: false),
                    Jurusan = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    Kampus = table.Column<string>(type: "nvarchar(40)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_Mahasiswa", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_M_Mahasiswa_NPM",
                table: "TB_M_Mahasiswa",
                column: "NPM",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_M_Mahasiswa");
        }
    }
}
