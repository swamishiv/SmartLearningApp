using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLearningAPI.DATA;
using SmartLearningAPI.Models;
using SmartLearningAPI.Services;

namespace SmartLearningAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPost("register")]
        public IActionResult Register(Student student)
        {
            _studentService.RegisterStudent(student);
            return Ok("Student Registered Successfully");
        }

        [Authorize]
        [HttpGet("get-students")]
        public IActionResult GetStudents()
        {
            var students = _studentService.GetAllStudents();

            return Ok(students);
        }


    }
}
