using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.ProductOptionItem;

namespace DataService.Services
{
    public interface IProductOptionItemService : IService<ProductOptionItem, ProductOptionItemDto, ProductOptionItemCreateDto, ProductOptionItemUpdateDto>
    {

    }
    public class ProductOptionItemService : Service<ProductOptionItem, ProductOptionItemDto, ProductOptionItemCreateDto, ProductOptionItemUpdateDto>, IProductOptionItemService
    {
        public ProductOptionItemService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}