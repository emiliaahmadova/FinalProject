using System.Linq;
using AutoMapper;
using DataService.Data.Entities;
using DataService.dtos.About;
using DataService.dtos.Auth;
using DataService.dtos.Brand;
using DataService.dtos.Category;
using DataService.dtos.Contact;
using DataService.dtos.Department;
using DataService.dtos.Offer;
using DataService.dtos.Product;
using DataService.dtos.ProductOption;
using DataService.dtos.ProductOptionItem;
using DataService.dtos.ProductPhotos;
using DataService.dtos.ProductSlider;
using DataService.dtos.ProductSliderItem;
using DataService.dtos.Sale;
using DataService.dtos.SaleItem;
using DataService.dtos.Settings;
using DataService.dtos.Slider;
using DataService.dtos.SocialLink;
using DataService.dtos.User;

namespace DataService.mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region About
            CreateMap<About, AboutDto>();
            CreateMap<AboutCreateDto, About>();
            CreateMap<AboutUpdateDto, About>();
            #endregion

            #region Brand
            CreateMap<Brand, BrandDto>();
            CreateMap<BrandCreateDto, Brand>();
            CreateMap<BrandUpdateDto, Brand>();
            #endregion

            #region Category
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryCreateDto, Category>();
            CreateMap<CategoryUpdateDto, Category>();
            #endregion

            #region Contact
            CreateMap<Contact, ContactDto>();
            CreateMap<ContactCreateDto, Contact>();
            CreateMap<ContactUpdateDto, Contact>();
            #endregion

            #region Department
            CreateMap<Department, DepartmentDto>();
            CreateMap<DepartmentCreateDto, Department>();
            CreateMap<DepartmentUpdateDto, Department>();
            #endregion

            #region Offer
            CreateMap<Offer, OfferDto>();
            CreateMap<OfferCreateDto, Offer>();
            CreateMap<OfferUpdateDto, Offer>();
            #endregion

            #region Product
            CreateMap<Product, ProductDto>().ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos.OrderBy(p => p.Order).Select(p => p.FilePath))); ;
            CreateMap<Product, AdminProductDto>(); ;
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();
            #endregion

            #region ProductOption
            CreateMap<ProductOption, ProductOptionDto>();
            CreateMap<ProductOptionCreateDto, ProductOption>();
            CreateMap<ProductOptionUpdateDto, ProductOption>();
            #endregion

            #region ProductOptionItem
            CreateMap<ProductOptionItem, ProductOptionItemDto>();
            CreateMap<ProductOptionItemCreateDto, ProductOptionItem>();
            CreateMap<ProductOptionItemUpdateDto, ProductOptionItem>();
            #endregion

            #region ProductPhotos
            CreateMap<ProductPhotos, ProductPhotosDto>();
            CreateMap<ProductPhotosCreateDto, ProductPhotos>();
            CreateMap<ProductPhotosUpdateDto, ProductPhotos>();
            #endregion

            #region ProductSlider
            CreateMap<ProductSlider, ProductSliderDto>();
            CreateMap<ProductSliderCreateDto, ProductSlider>();
            CreateMap<ProductSliderUpdateDto, ProductSlider>();
            #endregion

            #region ProductSliderItem
            CreateMap<ProductSliderItem, ProductSliderItemDto>();
            CreateMap<ProductSliderItemCreateDto, ProductSliderItem>();
            CreateMap<ProductSliderItemUpdateDto, ProductSliderItem>();
            #endregion

            #region Sale
            CreateMap<Sale, SaleDto>();
            CreateMap<SaleCreateDto, Sale>();
            CreateMap<SaleUpdateDto, Sale>();
            #endregion

            #region SaleItem
            CreateMap<SaleItem, SaleItemDto>();
            CreateMap<SaleItemCreateDto, SaleItem>();
            CreateMap<SaleItemUpdateDto, SaleItem>();
            #endregion

            #region Settings
            CreateMap<Settings, SettingsDto>();
            CreateMap<SettingsCreateDto, Settings>();
            CreateMap<SettingsUpdateDto, Settings>();
            #endregion

            #region Slider
            CreateMap<Slider, SliderDto>();
            CreateMap<SliderCreateDto, Slider>();
            CreateMap<SliderUpdateDto, Slider>();
            #endregion

            #region SocialLink
            CreateMap<SocialLink, SocialLinkDto>();
            CreateMap<SocialLinkCreateDto, SocialLink>();
            CreateMap<SocialLinkUpdateDto, SocialLink>();
            #endregion

            #region User
            CreateMap<User, UserDto>();
            // CreateMap<SocialLinkCreateDto, SocialLink>();
            // CreateMap<SocialLinkUpdateDto, SocialLink>();
            #endregion

            #region Auth
            CreateMap<AuthRegisterDto, User>();
            // CreateMap<SocialLinkCreateDto, SocialLink>();
            // CreateMap<SocialLinkUpdateDto, SocialLink>();
            #endregion
        }
    }
}