using System.Security.Claims;
using System.Text;
using Blogpost.Application.Common.DataTransferObjects;
using Blogpost.Application.Common.Providers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Blogpost.Infrastructure.Identity.Tokens;

public class TokenService(IOptions<JwtOptions> jwtOptions, IDateTimeProvider dateTimeProvider)
    : ITokenService
{
    private readonly JwtOptions _jwtOptions = jwtOptions.Value;

    public TokenResponse GenerateJwt(Dictionary<string, object> claims)
    {
        ArgumentNullException.ThrowIfNull(claims);
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenDuration = dateTimeProvider.CurrentUtcTime.AddMinutes(_jwtOptions.TokenExpirationInMinutes);

        var descriptor = new SecurityTokenDescriptor
        {
            IssuedAt = dateTimeProvider.CurrentUtcTime,
            Expires = tokenDuration,
            SigningCredentials = credentials,
            Audience = _jwtOptions.ValidAudience,
            Issuer = _jwtOptions.ValidIssuer
        };

        if (claims.Count > 0)
        {
            descriptor.Claims = claims;
        }

        var handler = new JsonWebTokenHandler { SetDefaultTimesOnTokenCreation = false };
        var token = handler.CreateToken(descriptor);
        return new TokenResponse(token, tokenDuration);
    }

    public TokenResponse GenerateJwt(IEnumerable<Claim> claims)
    {
        ArgumentNullException.ThrowIfNull(claims);
        Dictionary<string, object> storage = [];

        foreach (var claim in claims)
        {
            storage.Add(claim.Type, claim.Value);
        }

        return GenerateJwt(storage);
    }
}