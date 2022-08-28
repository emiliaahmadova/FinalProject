namespace DataService.dtos.About
{
    public class AboutDto
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }

    }
}