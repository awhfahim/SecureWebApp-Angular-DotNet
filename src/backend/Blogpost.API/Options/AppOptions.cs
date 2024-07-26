using Microsoft.Build.Framework;

namespace Blogpost.API.Options;

public record AppOptions
{
    public const string SectionName = "AppOptions";
    [Required] public required string[] AllowedOriginsForCors { get; init; }
}