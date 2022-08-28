using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataService.Configurations
{
    public class SettingsConfiguration : IEntityTypeConfiguration<Settings>
    {
        public void Configure(EntityTypeBuilder<Settings> builder)
        {
            builder.HasData(
                new Settings
                {
                    Id = 1,
                    PrivacyPolicy = "Defaullt",
                    Order = 1
                }
            );
        }

    }
}