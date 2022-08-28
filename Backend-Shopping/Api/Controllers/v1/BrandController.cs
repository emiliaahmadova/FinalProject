using System.Threading.Tasks;
using Api.Libs.FileManager;
using DataService.dtos.Brand;
using DataService.dtos.FileUpload;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Messages;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class BrandController : BaseController
    {
        private readonly IBrandService _service;
        private readonly IFileManager _fileManager;
        public BrandController(IBrandService service, IFileManager fileManager)
        {
            _service = service;
            _fileManager = fileManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] BrandCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] BrandUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id) => Ok(_service.Remove(id));

        [HttpPost("RemoveUpload")]
        public IActionResult RemoveUpload([FromBody] RemoveFileUploadDto removeUploadDto)
        {
            _fileManager.Delete(removeUploadDto.FilePath!);
            _service.RemoveUpload(removeUploadDto.Id);
            return Ok(new { message = Message.Success });
        }
    }
}