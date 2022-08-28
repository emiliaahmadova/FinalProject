using System.Collections.Generic;

namespace DataService.Data.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}