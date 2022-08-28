using System;
using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataService.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasData(
                new Department
                {
                    Id = 1,
                    Name = "Men",
                    Order = 2,
                    CreateDate = DateTime.Now.ToString("dd-MM-yyyy"),
                    UpdateDate = DateTime.Now.ToString("dd-MM-yyyy")
                },
                 new Department
                 {
                     Id = 2,
                     Name = "Women",
                     Order = 1,
                     CreateDate = DateTime.Now.ToString("dd-MM-yyyy"),
                     UpdateDate = DateTime.Now.ToString("dd-MM-yyyy")
                 }

            );
        }
    }
}