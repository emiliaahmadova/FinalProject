using System.Collections.Generic;
using DataService.Enums;

namespace DataService.Data.Entities
{
    public class Product : BaseEntity
    {
        public int? DepartmentId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; }
        public bool IsAviable { get; set; }
        public ICollection<ProductOption> Options { get; set; }
        public ICollection<ProductPhotos> Photos { get; set; }
        public Category Category { get; set; }
        public Department Department { get; set; }
        public Brand Brand { get; set; }
    }
}