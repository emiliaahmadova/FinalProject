using System.Threading.Tasks;
using DataService.dtos.Offer;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class OfferController : BaseController
    {
        private readonly IOfferService _service;
        public OfferController(IOfferService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpGet("GetActives")]
        public async Task<IActionResult> GetActives() => Ok(await _service.GetActivesAsync());

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] OfferCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] OfferUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));
    }
}