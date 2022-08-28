using System.Threading.Tasks;
using DataService.dtos.Filter;
using DataService.dtos.Product;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class ProductController : BaseController
    {
        private readonly IProductService _service;
        private readonly IProductPhotosService _photosService;
        public ProductController(IProductService service, IProductPhotosService photosService)
        {
            _service = service;
            _photosService = photosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));

        [HttpGet("GetProductsByDepartment")]
        public async Task<IActionResult> GetProductsByDepartment([FromQuery] int departmentId, [FromQuery] Pagination pagination)
        => Ok(await _service.GetByDepartamentIdAsync(departmentId, pagination));


        [HttpGet("GetProductsByCategory")]
        public async Task<IActionResult> GetProductsByCategory([FromQuery] int categoryId, [FromQuery] Pagination pagination)
        => Ok(await _service.GetByCategoryIdAsync(categoryId, pagination));

        [HttpGet("GetFilteredProducts")]
        public async Task<IActionResult> GetFilteredProducts([FromQuery] FilterOptions filters, [FromQuery] Pagination pagination)
       => Ok(await _service.GetFilteredAsync(filters, pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpGet("GetByIdForClient/{id}")]
        public async Task<IActionResult> GetByIdForClient([FromRoute] int id) => Ok(await _service.GetByIdForClientAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] ProductUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));

        [HttpDelete("RemovePhoto/{id}")]

        public IActionResult RemovePhoto([FromRoute] int id) => Ok(_photosService.Remove(id));
    }
}