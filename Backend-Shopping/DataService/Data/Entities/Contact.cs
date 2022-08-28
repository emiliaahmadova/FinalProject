namespace DataService.Data.Entities
{
    public class Contact : BaseEntity
    {
        public int SettingsId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Info { get; set; }
        public Settings Settings { get; set; }
    }
}