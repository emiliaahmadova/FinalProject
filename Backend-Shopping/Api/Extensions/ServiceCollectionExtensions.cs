using Api.Libs.FileManager;
using DataService.Services;
using DataService.Services.mail_manager;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection LoadMyServices(this IServiceCollection services)
        {
            services.AddScoped<IAboutService, AboutService>();
            services.AddScoped<IBrandService, BrandService>();

            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IContactService, ContactService>();

            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IOfferService, OfferService>();

            services.AddScoped<IProductOptionItemService, ProductOptionItemService>();
            services.AddScoped<IProductOptionService, ProductOptionService>();

            services.AddScoped<IProductPhotosService, ProductPhotosService>();
            services.AddScoped<IProductService, ProductService>();

            services.AddScoped<IProductSliderService, ProductSliderService>();
            services.AddScoped<IProductSliderItemService, ProductSliderItemService>();

            services.AddScoped<ISaleService, SaleService>();
            services.AddScoped<ISaleItemService, SaleItemService>();

            services.AddScoped<ISettingsService, SettingsService>();
            services.AddScoped<ISliderService, SliderService>();

            services.AddScoped<ISocialLinkService, SocialLinkService>();
            services.AddScoped<IFileManager, FileManager>();

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMailService, MailService>();



            return services;
        }

    }
}