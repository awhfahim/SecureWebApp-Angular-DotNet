using Blogpost.Infrastructure.Identity.Members;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Blogpost.Infrastructure.Identity;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<AppUser,
    AppRole,
    Guid,
    UserClaim,
    UserRole,
    UserLogin,
    UserRoleClaim,
    UserToken>(options);