using DataService.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions
{
    public static class ServiceAddAppDbContextExtension
    {

        public static IServiceCollection AddAppDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(options =>
                                                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            return services;
        }
    }
}