using Blogpost.API.Options;
using Blogpost.API.RequestHandlers;
using Blogpost.Application.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blogpost.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IServiceProvider serviceProvider,
        HttpClient httpClient, 
        IOptions<GoogleRecaptchaOptions> googleRecaptchaOptions) 
        : ControllerBase
    {
        private readonly GoogleRecaptchaOptions _googleRecaptchaOptions = googleRecaptchaOptions.Value;
        [HttpPost("signup")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> SignUp(SignUpDto dto)
        {
            if (!await VerifyRecaptchaV3Token(dto.GoogleRecaptchaToken))
            {
                return BadRequest("Invalid recaptcha token");
            }
            
            var result = await SignUpHandler.Handle(serviceProvider, dto);

            if (!result.IsError) return Created();
            var error = result.Errors.Find(x => x.Code == "DuplicateEmail").Description;
            if (error is null)
            {
                return BadRequest();
            }
            return Conflict(error);
        }
        
        private async Task<bool> VerifyRecaptchaV3Token(string token)
        {
            try
            {
                var response = await httpClient.PostAsync(
                    $"{_googleRecaptchaOptions.VerificationEndpoint}?secret={_googleRecaptchaOptions.SecretKey}&response={token}", null
                ).ConfigureAwait(false);
                return response.IsSuccessStatusCode;
            }
            catch (TaskCanceledException)
            {
                return false;
            }
        }
    }
}
