using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.SocialLink;

namespace DataService.Services
{
    public interface ISocialLinkService : IService<SocialLink, SocialLinkDto, SocialLinkCreateDto, SocialLinkUpdateDto>
    {

    }
    public class SocialLinkService : Service<SocialLink, SocialLinkDto, SocialLinkCreateDto, SocialLinkUpdateDto>, ISocialLinkService
    {
        public SocialLinkService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}