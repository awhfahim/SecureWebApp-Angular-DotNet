using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Blogpost.Infrastructure.Identity.Members;

public class AppSigninManager(UserManager<AppUser> userManager, 
    IHttpContextAccessor contextAccessor, 
    IUserClaimsPrincipalFactory<AppUser> claimsFactory, 
    IOptions<IdentityOptions> optionsAccessor, 
    ILogger<SignInManager<AppUser>> logger, 
    IAuthenticationSchemeProvider schemes,
    IUserConfirmation<AppUser> userConfirmation) 
    : SignInManager<AppUser>(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, userConfirmation);