using DataService.dtos.Product;

namespace DataService.dtos.SaleItem
{
    public class SaleItemDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int SaleId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public ProductDto Product { get; set; }
    }
}