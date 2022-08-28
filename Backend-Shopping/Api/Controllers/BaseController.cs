using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("v{ver:apiVersion}/[controller]")]
    [ApiController]

    public class BaseController : ControllerBase
    {

    }

}