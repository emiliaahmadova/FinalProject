using DataService.dtos.ProductOption;

namespace DataService.dtos.ProductOptionItem
{
    public class ProductOptionItemDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Value { get; set; }
        // public ProductOptionDto ProductOption { get; set; }
    }
}