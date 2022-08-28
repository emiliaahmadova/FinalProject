namespace DataService.Data.Entities
{
    public class User : BaseEntity
    {
        public int UserRoleId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string ForgetPasswordToken { get; set; }
        public string Role { get; set; }
        public UserRole UserRole { get; set; }
    }
}