using DataService.Enums;

namespace DataService.Data.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string FilePath { get; set; }
    }
}