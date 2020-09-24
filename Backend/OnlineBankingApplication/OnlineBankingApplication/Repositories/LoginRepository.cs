﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly ProjectContext _accountDBContext;
        public LoginRepository(ProjectContext accountDBContext)
        {
            _accountDBContext = accountDBContext;
        }
        public Account VerifyLogin(int id, string password)
        {
            Account account = null;
            try
            {
                var accountFound = _accountDBContext.Accounts
                                     .Where(u => u.UserID == id && u.LoginPassword == password)
                                     .SingleOrDefault();

                if (accountFound != null)
                {
                    account = accountFound;
                }
                else
                {
                    account = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return account;
        }
    }
}