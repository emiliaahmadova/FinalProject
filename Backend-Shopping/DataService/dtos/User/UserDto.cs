namespace DataService.dtos.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Token { get; set; }
        public string ForgetPasswordToken { get; set; }
        public string Role { get; set; }
    }
}