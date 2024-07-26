using Blogpost.Application.Common.Providers;
using Blogpost.Infrastructure.Common.Providers;
using Blogpost.Infrastructure.Identity.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Blogpost.Infrastructure;

public static class DependencyInjectionExtensions
{
    public static void RegisterInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddSingleton<ITokenService, TokenService>();
    }
}