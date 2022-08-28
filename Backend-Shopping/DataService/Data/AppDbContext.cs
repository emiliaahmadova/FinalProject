using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOption> ProductOptions { get; set; }
        public DbSet<ProductOptionItem> ProductOptionItems { get; set; }

        public DbSet<ProductPhotos> ProductPhotos { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<ProductSlider> ProductSliders { get; set; }
        public DbSet<ProductSliderItem> ProductSliderItems { get; set; }

        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Slider> Sliders { get; set; }

        public DbSet<SocialLink> SocialLinks { get; set; }
        public DbSet<User> Users { get; set; }

    }
}