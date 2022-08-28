using System.Threading.Tasks;
using DataService.dtos.Auth;
using DataService.Services;
using Microsoft.AspNetCore.Mvc;
using Shared.Exceptions;

namespace Api.Controllers.v1
{
    public class AuthController : BaseController
    {
        private IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] AuthRegisterDto dto)
        {
            try
            {
                var user = await _service.Register(dto);
                Response.Headers.Add("Authorization", user.Token);
                return Ok(user);
            }
            catch (HttpException e)
            {

                return StatusCode(e.StatusCode, e.Response);
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] AuthLoginDto dto)
        {
            try
            {
                var user = await _service.Login(dto);

                return Ok(user);
                // Response.Headers.Add("Authorization", token);

            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }


        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] AuthForgetPasswordDto dto)
        {
            try
            {
                return Ok(await _service.ForgetPassword(dto));
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }



        [HttpPost("RecoveryPassword")]
        public async Task<IActionResult> RecoveryPassword([FromBody] AuthRecoveryPasswordDto dto) => Ok(await _service.RecoveryPassword(dto));

        [HttpGet]
        [Route("CheckToken")]

        public async Task<IActionResult> CheckToken([FromQuery] string token)
        {
            try
            {
                return Ok(await _service.CheckToken(token));
            }
            catch (HttpException e)
            {
                return StatusCode(e.StatusCode, e.Response);
            }
        }



    }

}