namespace Blogpost.Application.Common.DataTransferObjects;

public record struct TokenResponse(string Token, DateTime ExpirationDate);