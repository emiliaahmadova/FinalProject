namespace DataService.Data.Entities
{
    public class ProductColor : BaseEntity
    {
        public int ProductId { get; set; }
        public string Color { get; set; }
        public string Sku { get; set; }
    }
}