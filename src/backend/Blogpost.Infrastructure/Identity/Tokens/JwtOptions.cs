using System.ComponentModel.DataAnnotations;

namespace Blogpost.Infrastructure.Identity.Tokens;

public record JwtOptions : IValidatableObject
{
    public const string SectionName = "JwtTokenSettings";
    [Required] public required string Key { get; init; }

    [Required] public required int TokenExpirationInMinutes { get; init; }
    [Required] public required string ValidIssuer { get; init; }
    [Required] public required string ValidAudience { get; init; }
    
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(Key))
        {
            yield return new ValidationResult("No Key defined in JwtSettings config", new[] { nameof(Key) });
        }
    }
}