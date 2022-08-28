using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.ProductSlider;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface IProductSliderService : IService<ProductSlider, ProductSliderDto, ProductSliderCreateDto, ProductSliderUpdateDto>
    {
        Task<IDataResult<ProductSliderDto>> GetProductSliderByOrder(int order);

    }
    public class ProductSliderService : Service<ProductSlider, ProductSliderDto, ProductSliderCreateDto, ProductSliderUpdateDto>, IProductSliderService
    {
        public ProductSliderService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<IDataResult<IEnumerable<ProductSliderDto>>> GetAllAsync(Pagination pagination, List<ProductSlider> includedData = null)
        {
            includedData = await _context.ProductSliders
                           .Include(e => e.ProductSliderItems)
                           .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                           .Take(pagination.PageSize)
                           .ToListAsync(); ;

            return await base.GetAllAsync(pagination, includedData);
        }

        public async Task<IDataResult<ProductSliderDto>> GetProductSliderByOrder(int order)
        {
            throw new System.NotImplementedException();
        }

        public override DataResult<ProductSliderDto> Update(ProductSliderUpdateDto input)
        {
            var productSlider = _mapper.Map<ProductSliderUpdateDto, ProductSlider>(input);
            var sliderItems = _context.ProductSliders.Where(e => e.Id == input.Id).SelectMany(c => c.ProductSliderItems!).ToList();
            _context.ProductSliderItems.RemoveRange(sliderItems);
            _context.ProductSliders.Update(productSlider);
            _context.SaveChanges();
            var data = _mapper.Map<ProductSlider, ProductSliderDto>(productSlider);
            return new DataResult<ProductSliderDto>(data: data, message: Message.Success, null);
        }
    }
}