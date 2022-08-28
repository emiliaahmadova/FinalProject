using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions
{
    public static class ServiceCorsExtension
    {
        public static IServiceCollection SetCors(this IServiceCollection services, IConfiguration configuration, string allowSpecficOrigins)
        {
            services.AddCors(options =>
          {
              options.AddPolicy(name: allowSpecficOrigins, builder =>
              {
                  builder
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .WithExposedHeaders("Authorization")
                  .WithOrigins(configuration.GetSection("AllowedHosts").Get<string>());
              });
          });
            return services;
        }

    }
}