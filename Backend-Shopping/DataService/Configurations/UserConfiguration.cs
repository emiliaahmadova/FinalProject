using System;
using DataService.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shared.Jwt;

namespace DataService.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var key = "JA1CakKcKSmHqbgIK-BYxMEtLXQPYUvQa836aKRdXWyfYSHOlcvFeOV0zhB3icH1_kqNb2MWGiDUxJ7q1JYGRgWS9y465cFHt3UzR3p7C-wmRzA0oOVzrQjD3gmoLKrA5eoiJRHQg8SxFdxYpmJF";
            var issuer = "my";
            var role = "Admin";

            builder.HasData(
                new User
                {
                    Id = 1,
                    Fullname = "Admin",
                    Email = "Admin@mail.ru",
                    Phone = "123456789",
                    Password = CryptoHelper.Crypto.HashPassword("admin12345"),
                    Token = JwtAuthenticationManager.GenerateJwtToken(key, "Admin@mail.ru", issuer, role),
                    Role = role,
                    UserRoleId = 1,
                    CreateDate = DateTime.Now.ToString("dd-MM-yyyy"),
                    UpdateDate = DateTime.Now.ToString("dd-MM-yyyy")

                }

            );
        }
    }
}