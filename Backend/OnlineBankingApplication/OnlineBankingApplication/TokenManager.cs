using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace OnlineBankingApplication
{
    public class TokenManager
    {
        public static string secret = Guid.NewGuid().ToString();
        public static string GenerateToken(string id)
        {
            Byte[] key = Convert.FromBase64String(secret);
            SymmetricSecurityKey skey = new SymmetricSecurityKey(key);
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject =new ClaimsIdentity(claims: new[] { new Claim(type:ClaimTypes.Name,value:id)}),
                Expires =DateTime.UtcNow.AddMinutes(30),
                SigningCredentials=new SigningCredentials(skey,algorithm:SecurityAlgorithms.HmacSha256Signature)

            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}