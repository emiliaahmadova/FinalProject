namespace DataService.dtos.Contact
{
    public class ContactCreateDto
    {
        public int SettingsId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Info { get; set; }
        public int Order { get; set; }
    }
}