using Blogpost.Application.Common.Providers;

namespace Blogpost.Infrastructure.Common.Providers;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime CurrentUtcTime => TimeProvider.System.GetUtcNow().UtcDateTime;
    public DateTime CurrentLocalTime => TimeProvider.System.GetLocalNow().LocalDateTime;
}