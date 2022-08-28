using System.Collections.Generic;
using DataService.dtos.ProductSliderItem;

namespace DataService.dtos.ProductSlider
{
    public class ProductSliderUpdateDto
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int SettingsId { get; set; }
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string Code { get; set; }
        public ICollection<ProductSliderItemUpdateDto> ProductSliderItems { get; set; }

    }
}