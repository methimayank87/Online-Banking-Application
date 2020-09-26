using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    interface ILoginRepository
    {
        Account VerifyLogin(int id, string password);
    }
}