using Api.Libs.FileManager;
using DataService.dtos.FileUpload;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shared.Messages;

namespace Api.Controllers
{
    public class FileUploadController : BaseController
    {
        private readonly IFileManager _fileManager;

        public FileUploadController(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }

        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            var src = _fileManager.Upload(file);
            return Ok(new { src });
        }

        [HttpPost("RemoveUpload")]
        public IActionResult RemoveUpload([FromBody] RemoveFileStorageDto removeFileStorage)
        {
            _fileManager.Delete(removeFileStorage.FilePath!);
            return Ok(new { message = Message.Deleted });
        }

    }
}
