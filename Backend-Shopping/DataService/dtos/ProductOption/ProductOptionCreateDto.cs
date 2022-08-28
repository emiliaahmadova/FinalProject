using System.Collections.Generic;
using DataService.dtos.ProductOptionItem;
using DataService.Enums;

namespace DataService.dtos.ProductOption
{
    public class ProductOptionCreateDto
    {
        public int ProductId { get; set; }
        public int Order { get; set; }
        public string Title { get; set; }
        public string Sku { get; set; }
        public OptionsType Type { get; set; }
        public ICollection<ProductOptionItemCreateDto> ProductOptionItems { get; set; }

    }
}