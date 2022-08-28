using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.ProductSlider;

namespace DataService.Services
{
    public interface IProductSliderItemService : IService<ProductSlider, ProductSliderDto, ProductSliderCreateDto, ProductSliderUpdateDto>
    {

    }
    public class ProductSliderItemService : Service<ProductSlider, ProductSliderDto, ProductSliderCreateDto, ProductSliderUpdateDto>, IProductSliderItemService
    {
        public ProductSliderItemService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}