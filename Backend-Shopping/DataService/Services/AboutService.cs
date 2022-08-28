using System.Threading.Tasks;
using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.About;
using Microsoft.EntityFrameworkCore;
using Shared.Messages;
using Shared.Pagination;
using Shared.Results;

namespace DataService.Services
{
    public interface IAboutService : IService<About, AboutDto, AboutCreateDto, AboutUpdateDto>
    {
        void RemoveUpload(int id);
        Task<IDataResult<AboutDto>> GetActiveAsync();

    }
    public class AboutService : Service<About, AboutDto, AboutCreateDto, AboutUpdateDto>, IAboutService
    {
        public AboutService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<IDataResult<AboutDto>> GetActiveAsync()
        {
            var data = await _context.Abouts.FirstOrDefaultAsync(e => e.IsActive);
            var dto = _mapper.Map<About, AboutDto>(data);
            return new DataResult<AboutDto>(data: dto, message: Message.Success, null);
        }

        public void RemoveUpload(int id)
        {
            var entity = _context.Abouts.Find(id);
            entity!.FilePath = null;
            _context.SaveChanges();
        }
    }
}