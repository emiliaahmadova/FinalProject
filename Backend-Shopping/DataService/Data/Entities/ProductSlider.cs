using System.Collections.Generic;

namespace DataService.Data.Entities
{
    public class ProductSlider : BaseEntity
    {
        public int SettingsId { get; set; }
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string Code { get; set; }
        public ICollection<ProductSliderItem> ProductSliderItems { get; set; }
        public Settings Settings { get; set; }
    }
}