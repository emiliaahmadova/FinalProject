using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Brand;

namespace DataService.Services
{
    public interface IBrandService : IService<Brand, BrandDto, BrandCreateDto, BrandUpdateDto>
    {
        void RemoveUpload(int id);

    }
    public class BrandService : Service<Brand, BrandDto, BrandCreateDto, BrandUpdateDto>, IBrandService
    {
        public BrandService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public void RemoveUpload(int id)
        {
            var entity = _context.Brands.Find(id);
            entity!.FilePath = null;
            _context.SaveChanges();
        }

    }
}