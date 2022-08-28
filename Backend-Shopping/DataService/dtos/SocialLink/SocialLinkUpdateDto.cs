namespace DataService.dtos.SocialLink
{
    public class SocialLinkUpdateDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int SettingsId { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Endpoint { get; set; }
    }
}