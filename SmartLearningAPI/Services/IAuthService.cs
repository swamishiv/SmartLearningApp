using SmartLearningAPI.DTO;

namespace SmartLearningAPI.Services
{
    public interface IAuthService
    {
        string Login(LoginModel model);

    }
}
