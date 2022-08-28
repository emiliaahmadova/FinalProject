using AutoMapper;
using DataService.Data;
using DataService.Data.Entities;
using DataService.dtos.Department;

namespace DataService.Services
{
    public interface IDepartmentService : IService<Department, DepartmentDto, DepartmentCreateDto, DepartmentUpdateDto>
    {

    }
    public class DepartmentService : Service<Department, DepartmentDto, DepartmentCreateDto, DepartmentUpdateDto>, IDepartmentService
    {
        public DepartmentService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
    }
}