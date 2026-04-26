using SmartLearningAPI.DTO;
using SmartLearningAPI.Models;

namespace SmartLearningAPI.Services
{
    public interface IAuthService
    {
       // string Login(LoginModel model);
        void Register(RegisterDto dto);
        void CreateUser(User user, string currentRole);
        User Login(LoginModel dto);

    }
}
