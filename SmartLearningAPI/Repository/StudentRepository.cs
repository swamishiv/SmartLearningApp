using Microsoft.EntityFrameworkCore;
using SmartLearningAPI.DATA;
using SmartLearningAPI.Models;

namespace SmartLearningAPI.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
        }
        public Student GetByEmail(string email)
        {
            return _context.Students
                .FirstOrDefault(s => s.Email == email);
        }

        public List<Student> GetAllStudents()
        {
            return _context.Students.ToList();
        }
    }
}
