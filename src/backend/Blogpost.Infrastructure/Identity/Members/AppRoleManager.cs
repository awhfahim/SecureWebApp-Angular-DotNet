using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Blogpost.Infrastructure.Identity.Members;

public class AppRoleManager(
    IRoleStore<AppRole> store,
    IEnumerable<IRoleValidator<AppRole>> roleValidators,
    ILookupNormalizer keyNormalizer,
    IdentityErrorDescriber errors,
    ILogger<RoleManager<AppRole>> logger)
    : RoleManager<AppRole>(store, roleValidators, keyNormalizer, errors, logger);