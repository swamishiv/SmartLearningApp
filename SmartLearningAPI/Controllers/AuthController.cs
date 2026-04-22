using Microsoft.AspNetCore.Mvc;
using SmartLearningAPI.DTO;
using SmartLearningAPI.Repository;
using SmartLearningAPI.Services;

namespace SmartLearningAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginModel model)
        {
            var token = _authService.Login(model);

            if (token == null)
                return Unauthorized("Invalid email or password");

            return Ok(new
            {
                message = "Login successful",
                token = token
            });
        }
    }
}
