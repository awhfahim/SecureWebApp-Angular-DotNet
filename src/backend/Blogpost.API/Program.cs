using Blogpost.API.Consts;
using Blogpost.API.Extensions;
using Blogpost.API.Options;
using Blogpost.Infrastructure;
using Blogpost.Infrastructure.Identity;
using Blogpost.Infrastructure.Identity.ServiceExtensions;
using Blogpost.Infrastructure.Identity.Tokens;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Serilog;

Env.Load();

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .AddEnvironmentVariables()
    .Build();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);
    
    builder.Configuration
        .AddJsonFile("appsettings.json", optional: false)
        .AddEnvironmentVariables();

    builder.Services.BindAndValidateOptions<SerilogEmailSinkOptions>(SerilogEmailSinkOptions.SectionName);
    builder.Services.BindAndValidateOptions<SmtpOptions>(SmtpOptions.SectionName);
    builder.Services.BindAndValidateOptions<JwtOptions>(JwtOptions.SectionName);

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    
    //Add JWT Bearer
    builder.Services.AddJwtAuthentication();
    builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

    
    //Postgre SQL Config
    var dbUrl = configuration.GetRequiredSection(ConnectionString.DefaultConnection)
        .GetValue<string>(ConnectionString.DbName);
    
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseNpgsql(dbUrl);
    });
    
    builder.Services.RegisterInfrastructureServices(configuration);
    builder.Services.AddIdentityConfiguration();
    builder.Services.AddCookieAuthentication();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    else
    {
        app.UseExceptionHandler("/error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    await app.RunAsync();
    
    return 0;
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "Application start-up failed");
    return 1;
}
finally
{
    Log.Information("Shut down complete");
    await Log.CloseAndFlushAsync();
}
