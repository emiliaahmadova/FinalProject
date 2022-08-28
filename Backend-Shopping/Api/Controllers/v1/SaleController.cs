using System.Threading.Tasks;
using DataService.dtos.Sale;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class SaleController : BaseController
    {
        private readonly ISaleService _service;
        private readonly ISaleItemService _saleItemservice;
        public SaleController(ISaleService service, ISaleItemService saleItemservice)
        {
            _service = service;
            _saleItemservice = saleItemservice;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));


        [HttpGet("SaleItems/{saleId}")]
        public async Task<IActionResult> GetBySaleId([FromRoute] int saleId, [FromQuery] Pagination pagination)
        => Ok(await _saleItemservice.GetBySaleIdAsync(saleId, pagination));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] SaleCreateDto dto) => Ok(await _service.CreateAsync(dto));

        // [HttpPut]
        // public IActionResult Update([FromBody] SaleUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));
    }
}