using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Settings;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface ISettingsService : IService<Settings, SettingsDto, SettingsCreateDto, SettingsUpdateDto>
    {
        Task<IDataResult<SettingsDto>> GetSettingByOrderFirst();
    }
    public class SettingsService : Service<Settings, SettingsDto, SettingsCreateDto, SettingsUpdateDto>, ISettingsService
    {
        public SettingsService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<IDataResult<IEnumerable<SettingsDto>>> GetAllAsync(Pagination pagination, List<Settings> includedData = null)
        {
            includedData = await _context.Settings
                           .Include(e => e.Contacts)
                           .Include(e => e.SocialLinks)
                           .Include(e => e.ProductSliders)
                           .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                           .Take(pagination.PageSize)
                           .ToListAsync(); ;

            return await base.GetAllAsync(pagination, includedData);
        }

        public override async Task<IDataResult<SettingsDto>> GetByIdAsync(int id, Settings entity = null)
        {
            entity = await _context.Settings
                           .Include(e => e.Contacts)
                           .Include(e => e.SocialLinks)
                           .Include(e => e.ProductSliders)
                           .FirstOrDefaultAsync(e => e.Id == id);
            return await base.GetByIdAsync(id, entity);
        }

        public async Task<IDataResult<SettingsDto>> GetSettingByOrderFirst()
        {
            var data = await _context.Settings
                           .Include(e => e.Contacts)
                           .Include(e => e.SocialLinks)
                           .Include(e => e.ProductSliders)
                           .ThenInclude(e => e.ProductSliderItems)
                           .ThenInclude(e => e.Product).ThenInclude(e => e.Photos)
                           .Include(e => e.Sliders)
                           .FirstOrDefaultAsync(e => e.Order == 1);
            var dto = _mapper.Map<Settings, SettingsDto>(data!);
            return new DataResult<SettingsDto>(data: dto, message: Message.Success, null);
        }
    }
}