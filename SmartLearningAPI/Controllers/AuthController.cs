using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLearningAPI.DTO;
using SmartLearningAPI.Helpers;
using SmartLearningAPI.Models;
using SmartLearningAPI.Repository;
using SmartLearningAPI.Services;

namespace SmartLearningAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly JwtService _jwtService;
        public AuthController(IAuthService authService, JwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        // ✅ Register
        [HttpPost("Register")]
        public IActionResult Register(RegisterDto dto)
        {
            _authService.Register(dto);
            return Ok("Student registered successfully");
        }

        // ✅ Login
        [HttpPost("Login")]
        public IActionResult Login(LoginModel dto)
        {
            var user = _authService.Login(dto);

            if (user == null)
                return Unauthorized("Invalid credentials");

            bool isPasswordValid = PasswordHelper.VerifyPassword(dto.Password, user.Password);

            if (!isPasswordValid)
                return null;

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.RoleCode,
                Token = token
            });
        }

        // ✅ Create User (Admin)
        [HttpPost("CreateUser")]
        public IActionResult CreateUser(User user)
        {
            var role = User.FindFirst("RoleCode")?.Value; 

            _authService.CreateUser(user, role);

            return Ok("User created successfully");
        }
    }
}
