using DataService.dtos.Department;

namespace DataService.dtos.Slider
{
    public class SliderDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string FilePath { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Content { get; set; }
        public DepartmentDto Department { get; set; }
    }
}