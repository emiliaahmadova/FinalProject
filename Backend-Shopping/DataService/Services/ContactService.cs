using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Contact;

namespace DataService.Services
{
    public interface IContactService : IService<Contact, ContactDto, ContactCreateDto, ContactUpdateDto>
    {

    }
    public class ContactService : Service<Contact, ContactDto, ContactCreateDto, ContactUpdateDto>, IContactService
    {
        public ContactService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}