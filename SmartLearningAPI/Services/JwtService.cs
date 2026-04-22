using Microsoft.IdentityModel.Tokens;
using SmartLearningAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartLearningAPI.Services
{
    public class JwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(Student student)
        {
            // 1. Create claims (data inside token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, student.Email),
                new Claim(ClaimTypes.NameIdentifier, student.Id.ToString())
            };

            // 2. Get secret key from appsettings.json
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            // 3. Create signing credentials (algorithm + key)
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 4. Create JWT token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            // 5. Convert token to string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
