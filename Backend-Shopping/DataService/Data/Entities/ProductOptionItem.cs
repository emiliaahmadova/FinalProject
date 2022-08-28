namespace DataService.Data.Entities
{
    public class ProductOptionItem : BaseEntity
    {
        public int ProductOptionId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public ProductOption ProductOption { get; set; }
    }
}