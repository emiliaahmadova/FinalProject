namespace DataService.dtos.Slider
{
    public class SliderCreateDto
    {
        public int Order { get; set; }
        public string FilePath { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Content { get; set; }
    }
}