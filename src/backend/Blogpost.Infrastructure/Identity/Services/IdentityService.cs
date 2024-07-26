using Blogpost.Application.Common.Providers;
using Blogpost.Application.DataTransferObjects;
using Blogpost.Infrastructure.Identity.Members;
using ErrorOr;
using Microsoft.Extensions.Logging;

namespace Blogpost.Infrastructure.Identity.Services;

public class IdentityService(AppUserManager appUserManager, IDateTimeProvider dateTimeProvider,
    IGuidProvider guidProvider, ILogger<IdentityService> logger) : IIdentityService
{
    public async Task<ErrorOr<AppUser>> SignUpAsync(SignUpDto signUpDto)
    {
        var user = new AppUser
        {
            Id = guidProvider.RandomGuid(),
            UserName = signUpDto.Email,
            Email = signUpDto.Email
        };

        var existingUser = await appUserManager.FindByEmailAsync(signUpDto.Email);
        
        if (existingUser != null)
        {
            logger.LogError("User with email { email } already exists", signUpDto.Email);
            return Error.Custom(500, "DuplicateEmail", "User with this email already exists");
        }

        var result = await appUserManager.CreateAsync(user, signUpDto.Password);

        if (result.Succeeded) return user;
        
        var err = result.Errors.First();
        logger.LogError("Failed to create user: { description }", err.Description);
        return Error.Failure(err.Code, err.Description);

    }
}