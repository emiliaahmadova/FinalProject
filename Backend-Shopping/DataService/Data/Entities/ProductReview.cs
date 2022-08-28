namespace DataService.Data.Entities
{
    public class ProductReview : BaseEntity
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public double Star { get; set; }
        public string Review { get; set; }
        public User User { get; set; }
        public Product Product { get; set; }
    }
}