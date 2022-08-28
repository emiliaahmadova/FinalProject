using System.Threading.Tasks;
using DataService.dtos.ProductSlider;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class ProductSliderController : BaseController
    {
        private readonly IProductSliderService _service;
        public ProductSliderController(IProductSliderService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductSliderCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] ProductSliderUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));
    }
}