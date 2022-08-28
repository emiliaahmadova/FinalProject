using System.ComponentModel.DataAnnotations;

namespace DataService.dtos.Auth
{
    public class AuthRegisterDto
    {
        [Required]
        [MaxLength(1000)]
        public string Fullname { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Email { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Phone { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Password { get; set; }
    }
}