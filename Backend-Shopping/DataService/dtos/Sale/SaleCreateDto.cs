using System.Collections.Generic;
using DataService.dtos.SaleItem;

namespace DataService.dtos.Sale
{
    public class SaleCreateDto
    {
        public int UserId { get; set; }
        public double TotalSalePrice { get; set; }
        public string Adress { get; set; }
        public string Note { get; set; }
        public List<SaleItemCreateDto> SaleItems { get; set; }
    }
}