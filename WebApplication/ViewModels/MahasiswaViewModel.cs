using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.ViewModels
{
    public class MahasiswaViewModel
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(8)")]
        public string NPM { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(1)")]
        public string Jenis_Kelamin { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(30)")]
        public string Jurusan { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(40)")]
        public string Kampus { get; set; }

        public IFormFile Foto { get; set; }
    }
}
