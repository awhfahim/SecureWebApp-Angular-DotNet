using System.Text;
using Blogpost.Infrastructure.Identity.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Blogpost.API.Options;

public class JwtBearerOptionsSetup(IOptions<JwtOptions> jwtOptions) : IConfigureOptions<JwtBearerOptions>
{
    private JwtOptions JwtOptions => jwtOptions.Value;

    public void Configure(JwtBearerOptions options)
    {
        options.IncludeErrorDetails = true;
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = JwtOptions.ValidIssuer,
            ValidateAudience = true,
            ValidAudience = JwtOptions.ValidAudience,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.Key)),
            ValidateIssuerSigningKey = true
        };
        
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["ACCESS_TOKEN"];
                return Task.CompletedTask;
            }
        };
    }
}