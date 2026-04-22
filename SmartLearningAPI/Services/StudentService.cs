using SmartLearningAPI.Helpers;
using SmartLearningAPI.Models;
using SmartLearningAPI.Repository;


namespace SmartLearningAPI.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public void RegisterStudent(Student student)
        {
            // 🔐 Hash password
            student.Password = PasswordHelper.HashPassword(student.Password);

            student.CreatedDate = DateTime.Now;

            _studentRepository.AddStudent(student);
        }

        public List<Student> GetAllStudents()
        {
            return _studentRepository.GetAllStudents();
        }
    }
}
