using Autofac;
using Autofac.Extensions.DependencyInjection;
using Application;
using Infrastructure;
using Presentation;

var builder = WebApplication.CreateBuilder(args);

// Use Autofac as the service provider factory
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder => 
{
    // Register Autofac modules here if needed
    // containerBuilder.RegisterModule(new AutofacModule());
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "API",
        Version = "v1",
        Description = "API"
    });
});

// Add controllers
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
// Register layered architecture
// Application layer (contains MediatR and AutoMapper registration)
builder.Services.AddApplication();

// Infrastructure layer (contains DbContext, repositories, and services)
builder.Services.AddInfrastructure(builder.Configuration);

// Presentation layer (contains controllers and API-specific services)
builder.Services.AddPresentation();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("https://localhost:4200")  
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();
// using (var scope = app.Services.CreateScope())
// {
//     var initializer = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();
//     await initializer.InitializeAsync();
// }

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();