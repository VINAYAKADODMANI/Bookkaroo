using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserServices.Models;

namespace UserServices.Helpers
{
    public class TokenHelper
    {
        public string GenerateToken(Users u)
        {
            // Define security key and credentials
            var secretKey = "!@$#@%WEFSEFD^$%#$%^^%^&$E$%SDFDFY$%$%#$^";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Add claims
            var claims = new[]
            {
            new Claim("email", u.email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
            var token = new JwtSecurityToken(
                issuer: "Bookkaro",
                audience: "Bookkaro",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            // Return token string
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
