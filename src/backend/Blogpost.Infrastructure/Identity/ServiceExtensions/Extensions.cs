using Blogpost.Infrastructure.Identity.Members;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Blogpost.Infrastructure.Identity.ServiceExtensions;

public static class Extensions
{
    public static IServiceCollection AddIdentityConfiguration(this IServiceCollection services)
    {
        const string allowedCharsInPassword =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

        services.AddIdentity<AppUser, AppRole>(
                options =>
                {
                    // for 6 digit numeric code
                    options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider;
                    options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
                }
            )
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddUserManager<AppUserManager>()
            .AddRoleManager<AppRoleManager>()
            .AddSignInManager<AppSigninManager>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;

            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;

            options.User.AllowedUserNameCharacters = allowedCharsInPassword;
            options.User.RequireUniqueEmail = true;
            options.SignIn.RequireConfirmedAccount = true;
        });

        return services;
    }

    public static IServiceCollection AddCookieAuthentication(this IServiceCollection services)
    {
        services.ConfigureApplicationCookie(options =>
        {
            options.LoginPath = new PathString("/account/login");
            options.AccessDeniedPath = new PathString("/home/error/401");
            options.LogoutPath = new PathString("/account/logout");
            options.Cookie.Name = "Identity";
            options.SlidingExpiration = true;
        });

        return services;
    }
}