using System.Threading.Tasks;
using Api.Libs.FileManager;
using DataService.dtos.FileUpload;
using DataService.dtos.Settings;
using DataService.dtos.Slider;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Messages;
using Shared.Pagination;

namespace Api.Controllers.v1
{
    public class SettingController : BaseController
    {
        private readonly ISettingsService _service;
        private readonly ISliderService _sliderService;
        private readonly IFileManager _fileManager;
        public SettingController(ISettingsService service, ISliderService sliderService, IFileManager fileManager)
        {
            _service = service;
            _sliderService = sliderService;
            _fileManager = fileManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSettings([FromQuery] Pagination pagination) => Ok(await _service.GetAllAsync(pagination));

        [HttpGet("GetOrderFirstSetting")]
        public async Task<IActionResult> GetOrderFirstSetting() => Ok(await _service.GetSettingByOrderFirst());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSettingById([FromRoute] int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> AddSetting([FromBody] SettingsCreateDto dto) => Ok(await _service.CreateAsync(dto));

        [HttpPut]
        public IActionResult UpdateSetting([FromBody] SettingsUpdateDto dto) => Ok(_service.Update(dto));

        [HttpDelete("{id}")]
        public IActionResult RemoveSetting([FromRoute] int id) => Ok(_service.Remove(id));



        [HttpGet("Slider")]
        public async Task<IActionResult> GetAllSliders([FromQuery] Pagination pagination) => Ok(await _sliderService.GetAllAsync(pagination));


        [HttpGet("Slider/{id}")]
        public async Task<IActionResult> GetSliderById([FromRoute] int id) => Ok(await _sliderService.GetByIdAsync(id));

        [HttpPost("Slider")]
        public async Task<IActionResult> AddSlider([FromBody] SliderCreateDto dto) => Ok(await _sliderService.CreateAsync(dto));

        [HttpPut("Slider")]
        public IActionResult UpdateSlider([FromBody] SliderUpdateDto dto) => Ok(_sliderService.Update(dto));

        [HttpDelete("Slider/{id}")]
        public IActionResult RemoveSlider([FromRoute] int id) => Ok(_sliderService.Remove(id));

        [HttpPost("Slider/RemoveUpload")]
        public IActionResult RemoveUpload([FromBody] RemoveFileUploadDto removeUploadDto)
        {
            _fileManager.Delete(removeUploadDto.FilePath!);
            _sliderService.RemoveUpload(removeUploadDto.Id);
            return Ok(new { message = Message.Success });
        }
    }
}