using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Sale;
using Microsoft.EntityFrameworkCore;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface ISaleService : IService<Sale, SaleDto, SaleCreateDto, SaleUpdateDto>
    {

    }
    public class SaleService : Service<Sale, SaleDto, SaleCreateDto, SaleUpdateDto>, ISaleService
    {
        public SaleService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async override Task<IDataResult<IEnumerable<SaleDto>>> GetAllAsync(Pagination pagination, List<Sale> includedData = null)
        {
            includedData = await _context.Sales
                           .Include(e => e.User)
                           .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                           .Take(pagination.PageSize)
                           .ToListAsync(); ;

            return await base.GetAllAsync(pagination, includedData);
        }
    }
}