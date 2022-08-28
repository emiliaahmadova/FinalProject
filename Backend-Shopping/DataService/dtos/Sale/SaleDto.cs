using System.Collections.Generic;
using DataService.dtos.SaleItem;
using DataService.dtos.User;

namespace DataService.dtos.Sale
{
    public class SaleDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TotalSalePrice { get; set; }
        public int Order { get; set; }
        public string Adress { get; set; }
        public string Note { get; set; }
        public UserDto User { get; set; }
        public ICollection<SaleItemDto> SaleItems { get; set; }
    }
}