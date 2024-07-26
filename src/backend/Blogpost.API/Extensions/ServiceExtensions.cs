using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Blogpost.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection BindAndValidateOptions<TOptions>(this IServiceCollection service, string optionName)
        where TOptions : class
    {
        service.AddOptions<TOptions>()
            .BindConfiguration(optionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();
        return service;
    }
    
    public static void AddJwtAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;})
            .AddJwtBearer();
    }
}