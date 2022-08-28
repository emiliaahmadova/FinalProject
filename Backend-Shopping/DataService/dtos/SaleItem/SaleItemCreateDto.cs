namespace DataService.dtos.SaleItem
{
    public class SaleItemCreateDto
    {
        public int ProductId { get; set; }
        public int Count { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
    }
}