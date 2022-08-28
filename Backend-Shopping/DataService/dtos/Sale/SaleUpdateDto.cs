namespace DataService.dtos.Sale
{
    public class SaleUpdateDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TotalSalePrice { get; set; }
        public int Order { get; set; }
    }
}