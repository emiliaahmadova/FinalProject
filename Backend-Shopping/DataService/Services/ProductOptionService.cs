using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.ProductOption;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface IProductOptionService : IService<ProductOption, ProductOptionDto, ProductOptionCreateDto, ProductOptionUpdateDto>
    {

    }

    public class ProductOptionService : Service<ProductOption, ProductOptionDto, ProductOptionCreateDto, ProductOptionUpdateDto>, IProductOptionService
    {
        public ProductOptionService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
        public override async Task<IDataResult<IEnumerable<ProductOptionDto>>> GetAllAsync(Pagination pagination, List<ProductOption> includedData = null)
        {
            includedData = await _context.ProductOptions
                           .Include(e => e.ProductOptionItems)
                           .ToListAsync(); ;

            return await base.GetAllAsync(pagination, includedData);
        }

        public override DataResult<ProductOptionDto> Update(ProductOptionUpdateDto input)
        {
            var productOption = _mapper.Map<ProductOptionUpdateDto, ProductOption>(input);
            var optionItems = _context.ProductOptionItems.Where(c => c.ProductOptionId == input.Id).ToList();
            _context.ProductOptionItems.RemoveRange(optionItems);
            _context.ProductOptions.Update(productOption);
            _context.SaveChanges();
            var data = _mapper.Map<ProductOption, ProductOptionDto>(productOption);
            return new DataResult<ProductOptionDto>(data: data, message: Message.Success, null);
        }
    }
}