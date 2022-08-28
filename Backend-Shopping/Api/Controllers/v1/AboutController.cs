using System.Threading.Tasks;
using Api.Libs.FileManager;
using DataService.dtos.About;
using DataService.dtos.FileUpload;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Messages;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class AboutController : BaseController
    {
        private readonly IAboutService _service;
        private readonly IFileManager _fileManager;
        public AboutController(IAboutService service, IFileManager fileManager)
        {
            _service = service;
            _fileManager = fileManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpGet("GetActiveAbout")]
        public async Task<IActionResult> GetActiveAbout() => Ok(await _service.GetActiveAsync());

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AboutCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] AboutUpdateDto dto) => Ok(_service.Update(dto));

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