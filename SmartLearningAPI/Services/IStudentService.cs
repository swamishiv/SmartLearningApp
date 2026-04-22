using SmartLearningAPI.Models;

namespace SmartLearningAPI.Services
{
    public interface IStudentService
    {

        void RegisterStudent(Student student);
        List<Student> GetAllStudents();
    }
}
