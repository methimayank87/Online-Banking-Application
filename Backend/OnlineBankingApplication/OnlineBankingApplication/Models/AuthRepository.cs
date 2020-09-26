using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBankingApplication.Models
{
    public class AuthRepository
    {
        public bool ValidateUser(string Username, string Password)
        {

            return Username == "bhushan" && Password == "demo";
        }
    }
}