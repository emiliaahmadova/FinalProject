using System.Collections.Generic;
using DataService.dtos.Contact;
using DataService.dtos.ProductSlider;
using DataService.dtos.Slider;
using DataService.dtos.SocialLink;

namespace DataService.dtos.Settings
{
    public class SettingsDto
    {
        public int Id { get; set; }
        public List<ProductSliderDto> ProductSliders { get; set; }
        public List<ContactDto> Contacts { get; set; }
        public List<SocialLinkDto> SocialLinks { get; set; }
        public List<SliderDto> Sliders { get; set; }
        public string PrivacyPolicy { get; set; }
        public int Order { get; set; }

    }
}