using SmartLearningAPI.Models;

namespace SmartLearningAPI.Repository
{
    public interface IStudentRepository
    {
        void AddStudent(Student student);
        Student GetByEmail(string email);
        List<Student> GetAllStudents();

    }
}
