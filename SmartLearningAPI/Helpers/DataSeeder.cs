using SmartLearningAPI.DATA;
using SmartLearningAPI.Models;

namespace SmartLearningAPI.Helpers
{
    public static class DataSeeder
    {
        public static void SeedAdmin(ApplicationDbContext context)
        {
            // check if admin already exists
            if (!context.Users.Any(x => x.Email == "admin@test.com"))
            {
                var admin = new User
                {
                    FullName = "Admin",
                    Email = "admin@test.com",
                    Password = PasswordHelper.HashPassword("123"), // 🔐 hashed
                    RoleCode = "ADM",
                    CreatedDate = DateTime.Now
                };

                context.Users.Add(admin);
                context.SaveChanges();
            }
        }
    }
}