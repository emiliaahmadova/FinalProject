namespace DataService.Data.Entities
{
    public class Slider : BaseEntity
    {
        public string FilePath { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Content { get; set; }
        public Department Department { get; set; }
    }
}