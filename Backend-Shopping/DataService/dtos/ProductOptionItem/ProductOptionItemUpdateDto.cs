namespace DataService.dtos.ProductOptionItem
{
    public class ProductOptionItemUpdateDto
    {
        public int? Id { get; set; }
        public int Order { get; set; }
        public int? ProductOptionId { get; set; }
        public string Value { get; set; }
    }
}