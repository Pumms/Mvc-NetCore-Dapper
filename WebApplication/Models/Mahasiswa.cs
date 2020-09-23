using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication.Models
{
    [Table("TB_M_Mahasiswa")]
    public class Mahasiswa
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(8)")]
        public string NPM { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(50)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(1)")]
        public string Jenis_Kelamin { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(30)")]
        public string Jurusan { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(40)")]
        public string Kampus { get; set; }
        [Required]
        public string Foto { get; set; }
    }
}
