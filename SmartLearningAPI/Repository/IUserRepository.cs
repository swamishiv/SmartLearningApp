using SmartLearningAPI.Models;

namespace SmartLearningAPI.Repository
{
    public interface IUserRepository
    {
        User GetUserByEmailAndPassword(string email, string password);
        void AddUser(User user);
    }
}
