namespace DataService.Data.Entities
{
    public class SocialLink : BaseEntity
    {
        public int SettingsId { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Endpoint { get; set; }
        public Settings Settings { get; set; }
    }
}