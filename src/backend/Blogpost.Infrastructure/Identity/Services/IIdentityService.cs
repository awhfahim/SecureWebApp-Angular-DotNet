using Blogpost.Application.DataTransferObjects;
using Blogpost.Infrastructure.Identity.Members;
using ErrorOr;

namespace Blogpost.Infrastructure.Identity.Services;

public interface IIdentityService
{
    Task<ErrorOr<AppUser>> SignUpAsync(SignUpDto signUpDto);

}