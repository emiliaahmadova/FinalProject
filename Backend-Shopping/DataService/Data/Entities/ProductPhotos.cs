namespace DataService.Data.Entities
{
    public class ProductPhotos : BaseEntity
    {
        public int ProductId { get; set; }
        public int ProductColorId { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public Product Product { get; set; }
    }
}