using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SmartLearningAPI.Models
{
    public class Student
    {
        public int Id { get; set; }  // Primary Key

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
