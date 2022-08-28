using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.SaleItem;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface ISaleItemService : IService<SaleItem, SaleItemDto, SaleItemCreateDto, SaleItemUpdateDto>
    {
        Task<IDataResult<IEnumerable<SaleItemDto>>> GetBySaleIdAsync(int saleId, Pagination pagination);

    }
    public class SaleItemService : Service<SaleItem, SaleItemDto, SaleItemCreateDto, SaleItemUpdateDto>, ISaleItemService
    {
        public SaleItemService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }


        public async Task<IDataResult<IEnumerable<SaleItemDto>>> GetBySaleIdAsync(int saleId, Pagination pagination)
        {
            var data = await _context.SaleItems.Include(e => e.Product).ThenInclude(e => e.Photos)
                                               .Where(e => e.SaleId == saleId)
                                               .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                                               .Take(pagination.PageSize)
                                               .ToListAsync();
            var dto = _mapper.Map<IEnumerable<SaleItem>, IEnumerable<SaleItemDto>>(data!);
            return new DataResult<IEnumerable<SaleItemDto>>(data: dto, message: Message.Success, null);
        }
    }
}