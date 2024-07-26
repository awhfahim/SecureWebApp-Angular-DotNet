namespace Blogpost.Application.DataTransferObjects;

public record struct SignUpDto(string FullName, string Email, string Password, string ConfirmPassword, string GoogleRecaptchaToken);