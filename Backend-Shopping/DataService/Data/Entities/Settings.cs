using System.Collections.Generic;

namespace DataService.Data.Entities
{
    public class Settings : BaseEntity
    {
        public List<ProductSlider> ProductSliders { get; set; }
        public List<Contact> Contacts { get; set; }
        public List<SocialLink> SocialLinks { get; set; }
        public List<Slider> Sliders { get; set; }
        public string PrivacyPolicy { get; set; }
    }
}