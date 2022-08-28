using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataService.Configurations
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasData(
                new UserRole
                {
                    Id = 1,
                    Role = "Admin",
                },
                new UserRole
                {
                    Id = 2,
                    Role = "User",
                }
            );
        }
    }

}