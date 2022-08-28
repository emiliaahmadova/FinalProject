
using DataService.dtos.Product;

namespace DataService.dtos.ProductSliderItem
{
    public class ProductSliderItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ProductSliderId { get; set; }
        public ProductDto Product { get; set; }
    }
}