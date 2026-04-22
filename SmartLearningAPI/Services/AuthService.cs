using SmartLearningAPI.DTO;
using SmartLearningAPI.Helpers;
using SmartLearningAPI.Repository;

namespace SmartLearningAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly JwtService _jwtService;

        public AuthService(IStudentRepository studentRepository, JwtService jwtService)
        {
            _studentRepository = studentRepository;
            _jwtService = jwtService;
        }

        public string Login(LoginModel model)
        {
            // 1. Get user
            var student = _studentRepository.GetByEmail(model.Email);

            if (student == null)
                return null;

            // 2. Verify password
            bool isValid = PasswordHelper.VerifyPassword(model.Password, student.Password);

            if (!isValid)
                return null;

            // 3. Generate JWT
            return _jwtService.GenerateToken(student);
        }
    }
}
