namespace DataService.dtos.About
{
    public class AboutCreateDto
    {
        public string FilePath { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }

    }
}