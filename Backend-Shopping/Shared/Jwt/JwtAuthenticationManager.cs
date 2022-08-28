using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Shared.Jwt
{
    public class JwtAuthenticationManager
    {
        public static string GenerateJwtToken(string key, string email, string issuer, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credetials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email,email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role,role)
            };
            var token = new JwtSecurityToken(
              issuer: issuer,
              audience: issuer,
              claims,
              expires: DateTime.Now.AddMonths(1),
              signingCredentials: credetials
            );
            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;
        }

    }
}