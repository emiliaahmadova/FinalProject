namespace DataService.dtos.SocialLink
{
    public class SocialLinkCreateDto
    {
        public int Order { get; set; }
        public int SettingsId { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Endpoint { get; set; }
    }
}