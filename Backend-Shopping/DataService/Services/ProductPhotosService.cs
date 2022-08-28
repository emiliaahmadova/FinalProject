using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.ProductPhotos;

namespace DataService.Services
{
    public interface IProductPhotosService : IService<ProductPhotos, ProductPhotosDto, ProductPhotosCreateDto, ProductPhotosUpdateDto>
    {

    }
    public class ProductPhotosService : Service<ProductPhotos, ProductPhotosDto, ProductPhotosCreateDto, ProductPhotosUpdateDto>, IProductPhotosService
    {
        public ProductPhotosService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}