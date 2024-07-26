using Blogpost.Application.Common.Providers;

namespace Blogpost.Infrastructure.Common.Providers;

public class GuidProvider : IGuidProvider
{
    public Guid RandomGuid() => Guid.NewGuid();
}