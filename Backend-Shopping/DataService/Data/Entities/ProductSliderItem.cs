namespace DataService.Data.Entities
{
    public class ProductSliderItem : BaseEntity
    {
        public int ProductId { get; set; }
        public int ProductSliderId { get; set; }
        public Product Product { get; set; }
        public ProductSlider ProductSlider { get; set; }

    }
}