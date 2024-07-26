using System.Security.Claims;
using Blogpost.Application.DataTransferObjects;
using Blogpost.Infrastructure.Identity.Members;
using Blogpost.Infrastructure.Identity.Services;
using ErrorOr;

namespace Blogpost.API.RequestHandlers;

public static class SignUpHandler
{
    public static async Task<ErrorOr<string>> Handle(IServiceProvider serviceProvider, SignUpDto signUpDto)
    {
        var identityService = serviceProvider.GetRequiredService<IIdentityService>();
        var user =  await identityService.SignUpAsync(signUpDto);
        
        if (user.IsError) return user.Errors;
        
        var appUserManager = serviceProvider.GetRequiredService<AppUserManager>();
        await appUserManager.AddClaimAsync(user.Value, new Claim("Member", bool.TrueString));
        
        return  user.Value.Email!;
    }
}