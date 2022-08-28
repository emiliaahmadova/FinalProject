using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Filter;
using DataService.dtos.Product;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface IProductService : IService<Product, AdminProductDto, ProductCreateDto, ProductUpdateDto>
    {
        Task<IDataResult<IEnumerable<ProductDto>>> GetByDepartamentIdAsync(int departmentId, Pagination pagination);
        Task<IDataResult<IEnumerable<ProductDto>>> GetFilteredAsync(FilterOptions filter, Pagination pagination);
        Task<IDataResult<IEnumerable<ProductDto>>> GetByCategoryIdAsync(int categoryId, Pagination pagination);
        Task<IDataResult<ProductDto>> GetByIdForClientAsync(int id);

    }
    public class ProductService : Service<Product, AdminProductDto, ProductCreateDto, ProductUpdateDto>, IProductService
    {
        public ProductService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async override Task<IDataResult<AdminProductDto>> GetByIdAsync(int id, Product entity = null)
        {
            entity = await _context.Products
                     .Include(p => p.Photos)
                     .FirstOrDefaultAsync(e => e.Id == id);
            return await base.GetByIdAsync(id, entity);
        }

        public async override Task<IDataResult<IEnumerable<AdminProductDto>>> GetAllAsync(Pagination pagination, List<Product> includedData = null)
        {
            includedData = await _context.Products
                           .Include(e => e.Photos)
                           .Include(e => e.Category)
                           .Include(e => e.Brand)
                           .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                           .Take(pagination.PageSize)
                           .ToListAsync(); ;

            return await base.GetAllAsync(pagination, includedData);
        }
        public override DataResult<AdminProductDto> Update(ProductUpdateDto input)
        {
            var product = _mapper.Map<ProductUpdateDto, Product>(input);
            var photos = _context.Products.Where(e => e.Id == product.Id).SelectMany(c => c.Photos!).ToList();
            _context.ProductPhotos.RemoveRange(photos);
            _context.Products.Update(product);
            _context.SaveChanges();
            var data = _mapper.Map<Product, AdminProductDto>(product);
            return new DataResult<AdminProductDto>(data: data, message: Message.Success, null);
        }

        public async Task<IDataResult<IEnumerable<ProductDto>>> GetByDepartamentIdAsync(int departmentId, Pagination pagination)
        {
            var data = await _context.Products.Include(e => e.Category)
                                              .Include(e => e.Photos)
                                              .Where(e => e.DepartmentId == departmentId)
                                              .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                                              .Take(pagination.PageSize)
                                              .ToListAsync();
            var dto = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(data!);
            return new DataResult<IEnumerable<ProductDto>>(data: dto, message: Message.Success, null);

        }

        public async Task<IDataResult<IEnumerable<ProductDto>>> GetByCategoryIdAsync(int categoryId, Pagination pagination)
        {
            var data = await _context.Products.Include(e => e.Category)
                                              .Include(e => e.Photos)
                                              .Where(e => e.CategoryId == categoryId)
                                              .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                                              .Take(pagination.PageSize)
                                              .ToListAsync();
            var dto = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(data!);
            return new DataResult<IEnumerable<ProductDto>>(data: dto, message: Message.Success, null);
        }

        public async Task<IDataResult<ProductDto>> GetByIdForClientAsync(int id)
        {
            var data = await _context.Products
                           .Include(e => e.Category)
                           .Include(e => e.Photos)
                           .Include(e => e.Brand)
                           .Include(e => e.Options).ThenInclude(e => e.ProductOptionItems)
                           .FirstOrDefaultAsync(e => e.Id == id);
            var dto = _mapper.Map<Product, ProductDto>(data);
            return new DataResult<ProductDto>(data: dto, message: Message.Success, null);
        }

        public async Task<IDataResult<IEnumerable<ProductDto>>> GetFilteredAsync(FilterOptions filter, Pagination pagination)
        {
            var data = await _context.Products.Include(e => e.Category)
                                             .Include(e => e.Photos)
                                             .Where(e => e.Price >= filter.MinPrice && e.Price <= filter.MaxPrice)
                                             .Where(e => filter.Name != null ? e.Name.Contains(filter.Name) : true)                                    
                                             .ToListAsync();
            List<Product> filteredData = new List<Product>();
            bool isFiltered = false;


            if (filter.DepartmentId != null)
            {
                var departmentProducts = new List<Product>();

                foreach (var department in filter.DepartmentId)
                {
                    if (filteredData.Count > 0)
                    {
                        departmentProducts.AddRange(filteredData.Where(e => e.DepartmentId == department).ToList());
                    }
                    else
                    {
                        departmentProducts.AddRange(data.Where(e => e.DepartmentId == department).ToList());

                    }
                }
                filteredData = departmentProducts;

                isFiltered = true;
            }

            if (filter.BrandId != null)
            {
                var brandProducts = new List<Product>();

                foreach (var brand in filter.BrandId)
                {
                    if (filteredData.Count > 0)
                    {
                        brandProducts.AddRange(filteredData.Where(e => e.BrandId == brand).ToList());
                    }
                    else
                    {
                        brandProducts.AddRange(data.Where(e => e.BrandId == brand).ToList());

                    }
                }
                filteredData = brandProducts;

                isFiltered = true;

            }

            if (filter.CategoryId != null)
            {
                var categoryProducts = new List<Product>();

                foreach (var category in filter.CategoryId)
                {
                    if (filteredData.Count > 0)
                    {
                        categoryProducts.AddRange(filteredData.Where(e => e.CategoryId == category).ToList());
                    }
                    else
                    {
                        categoryProducts.AddRange(data.Where(e => e.CategoryId == category).ToList());

                    }

                }
                filteredData = categoryProducts;
                isFiltered = true;

            }

            filteredData = filteredData.Distinct().ToList();


            var dto = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(isFiltered ? filteredData : data);
            return new DataResult<IEnumerable<ProductDto>>(data: dto, message: Message.Success, null);
        }
    }
}