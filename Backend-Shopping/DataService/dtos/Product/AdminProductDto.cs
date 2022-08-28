using System.Collections.Generic;
using DataService.dtos.Brand;
using DataService.dtos.Category;
using DataService.dtos.Department;
using DataService.dtos.ProductOption;
using DataService.dtos.ProductPhotos;

namespace DataService.dtos.Product
{
    public class AdminProductDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int CategoryId { get; set; }
        public int DepartmentId { get; set; }

        public int BrandId { get; set; }
        public string Name { get; set; }

        public double Price { get; set; }
        public double Rating { get; set; }

        public string Description { get; set; }
        public bool IsAviable { get; set; }
        public ICollection<ProductOptionDto> Options { get; set; }
        public ICollection<ProductPhotosDto> Photos { get; set; }
        public CategoryDto Category { get; set; }
        public DepartmentDto Deparment { get; set; }

        public BrandDto Brand { get; set; }
    }
}