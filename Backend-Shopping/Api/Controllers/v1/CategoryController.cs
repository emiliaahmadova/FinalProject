using System.Threading.Tasks;
using Api.Libs.FileManager;
using DataService.dtos.Category;
using DataService.dtos.FileUpload;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Messages;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _service;
        private readonly IFileManager _fileManager;

        public CategoryController(ICategoryService service, IFileManager fileManager)
        {
            _service = service;
            _fileManager = fileManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CategoryCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult Update([FromBody] CategoryUpdateDto dto) => Ok(_service.Update(dto));

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