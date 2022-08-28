using System.Threading.Tasks;
using DataService.dtos.Department;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class DepartmentController : BaseController
    {
        private readonly IDepartmentService _service;
        public DepartmentController(IDepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] DepartmentCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] DepartmentUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));
    }
}