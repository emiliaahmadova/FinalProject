using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Offer;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Results;

namespace DataService.Services
{
    public interface IOfferService : IService<Offer, OfferDto, OfferCreateDto, OfferUpdateDto>
    {
        Task<IDataResult<IEnumerable<OfferDto>>> GetActivesAsync();

    }
    public class OfferService : Service<Offer, OfferDto, OfferCreateDto, OfferUpdateDto>, IOfferService
    {
        public OfferService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<IDataResult<IEnumerable<OfferDto>>> GetActivesAsync()
        {
            var data = await _context.Offers.Where(e => e.IsActive).OrderBy(e => e.Order)
                                               .ToListAsync();
            var dto = _mapper.Map<IEnumerable<Offer>, IEnumerable<OfferDto>>(data!);
            return new DataResult<IEnumerable<OfferDto>>(data: dto, message: Message.Success, null);
        }
    }
}