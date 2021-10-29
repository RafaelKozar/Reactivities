using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {            
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManger;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManger)
        {
            _userManager = userManager;
            _signInManger = signInManger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized();
            
            var result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = "This will be a token",
                    UserName = user.UserName
                };
            }

            return Unauthorized();
        }
    }
}