using System.Collections.Generic;
using DataService.Enums;

namespace DataService.Data.Entities
{
    public class ProductOption : BaseEntity
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Sku { get; set; }

        public OptionsType Type { get; set; }
        public Product Product { get; set; }

        public ICollection<ProductOptionItem> ProductOptionItems { get; set; }
    }
}