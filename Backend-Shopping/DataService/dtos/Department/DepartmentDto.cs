using System.Collections.Generic;
using DataService.dtos.Category;

namespace DataService.dtos.Department
{
    public class DepartmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public ICollection<CategoryDto> Categories { get; set; }
    }
}