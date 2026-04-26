using SmartLearningAPI.DTO;
using SmartLearningAPI.Helpers;
using SmartLearningAPI.Models;
using SmartLearningAPI.Repository;

namespace SmartLearningAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly JwtService _jwtService;
        private readonly IUserRepository _userRepository;

        public AuthService(IStudentRepository studentRepository, JwtService jwtService, IUserRepository userRepository)
        {
            _studentRepository = studentRepository;
            _jwtService = jwtService;
            _userRepository = userRepository;
        }

        //public string Login(LoginModel model)
        //{
        //    // 1. Get user
        //    var student = _studentRepository.GetByEmail(model.Email);

        //    if (student == null)
        //        return null;

        //    // 2. Verify password
        //    bool isValid = PasswordHelper.VerifyPassword(model.Password, student.Password);

        //    if (!isValid)
        //        return null;

        //    // 3. Generate JWT
        //    return _jwtService.GenerateToken(student);
        //}



        // ✅ Login
        public User Login(LoginModel dto)
        {
            return _userRepository.GetUserByEmailAndPassword(dto.Email, dto.Password);
        }
        // ✅ Register (Student only)
        public void Register(RegisterDto dto)
        {
            dto.Password = PasswordHelper.HashPassword(dto.Password);
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password,
                RoleCode = "STU",
                CreatedDate = DateTime.Now
            };

            _userRepository.AddUser(user);
        }

        // ✅ Admin creates Teacher/Admin
        public void CreateUser(User user, string currentRole)
        {
            if (currentRole != "ADM")
                throw new Exception("Only admin can create users");

            user.Password = PasswordHelper.HashPassword(user.Password);
            user.CreatedDate = DateTime.Now;

            _userRepository.AddUser(user);
        
        }
    }
}
