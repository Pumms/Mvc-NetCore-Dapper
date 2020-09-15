using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class MahasiswaController : Controller
    {
        public IConfiguration Configuration { get; }
        DynamicParameters parameters = new DynamicParameters();
        public MahasiswaController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string ConnectionString()
        {
            var Connection = Configuration.GetConnectionString("Connection");
            return Connection;
        }

        // GET: MahasiswaController
        public ActionResult Index()
        {
            return View();
        }

        //GET
        public JsonResult GetData()
        {
            using (var connection = new SqlConnection(ConnectionString()))
            {
                var spName = "SP_Retrieve_TB_M_Mahasiswa";
                var execute = connection.Query<Mahasiswa>(spName, commandType: CommandType.StoredProcedure);
                return Json(new { data = execute });
            }
        }

        //POST
        public JsonResult Insert (Mahasiswa mahasiswa)
        {
            using (var connection = new SqlConnection(ConnectionString()))
            {
                var spName = "SP_Insert_TB_M_Mahasiswa";
                parameters.Add("@npm", mahasiswa.NPM);
                parameters.Add("@name", mahasiswa.Name);
                parameters.Add("@jenis_kelamin", mahasiswa.Jenis_Kelamin);
                parameters.Add("@jurusan", mahasiswa.Jurusan);
                parameters.Add("@kampus", mahasiswa.Kampus);
                var execute = connection.Query<Mahasiswa>(spName, parameters, commandType: CommandType.StoredProcedure);
                return Json(Ok());
            }
        }

        //GET:5 BY ID
        public JsonResult GetById (int id)
        {
            using (var connection = new SqlConnection(ConnectionString()))
            {
                var spName = "SP_RetrievebyId_TB_M_Mahasiswa";
                parameters.Add("@id", id);
                var execute = connection.Query<Mahasiswa>(spName, parameters, commandType: CommandType.StoredProcedure);
                return Json(new { data = execute });
            }
        }

        //UPDATE
        public JsonResult Update(Mahasiswa mahasiswa)
        {
            using (var connection = new SqlConnection(ConnectionString()))
            {
                var spName = "SP_Update_TB_M_Mahasiswa";
                parameters.Add("@id", mahasiswa.Id);
                parameters.Add("@name", mahasiswa.Name);
                parameters.Add("@jenis_kelamin", mahasiswa.Jenis_Kelamin);
                parameters.Add("@jurusan", mahasiswa.Jurusan);
                parameters.Add("@kampus", mahasiswa.Kampus);
                var execute = connection.Query<Mahasiswa>(spName, parameters, commandType: CommandType.StoredProcedure);
                return Json(Ok());
            }
        }
        
        //DELETE
        public JsonResult Delete(int id)
        {
            using (var connection = new SqlConnection(ConnectionString()))
            {
                var spName = "SP_Delete_TB_M_Mahasiswa";
                parameters.Add("@id", id);
                var execute = connection.Query<Mahasiswa>(spName, parameters, commandType: CommandType.StoredProcedure);
                return Json(Ok());
            }
        }
    }
}
