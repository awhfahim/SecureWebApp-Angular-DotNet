using System.Security.Claims;
using Blogpost.Application.Common.DataTransferObjects;

namespace Blogpost.Application.Common.Providers;

public interface ITokenService
{
    TokenResponse GenerateJwt(Dictionary<string, object> claims);
    TokenResponse GenerateJwt(IEnumerable<Claim> claims);
}