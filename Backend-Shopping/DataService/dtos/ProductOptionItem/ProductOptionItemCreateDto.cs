namespace DataService.dtos.ProductOptionItem
{
    public class ProductOptionItemCreateDto
    {
        public int? ProductOptionId { get; set; }
        public int Order { get; set; }
        public string Value { get; set; }
    }
}