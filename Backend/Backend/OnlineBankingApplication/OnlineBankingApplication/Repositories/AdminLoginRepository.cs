using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class AdminLoginRepository : ILoginRepository<Admin>
    {
        private readonly ProjectContext _projectContext;
        public AdminLoginRepository(ProjectContext projectContext)
        {
            this._projectContext = projectContext;
        }
        public Admin VerifyLogin(int id, string password)
        {
            Admin admin = null;
            try
            {
                var adminFound = _projectContext.Admins
                                     .Where(u => u.AdminID == id && u.AdminPassword == password)
                                     .SingleOrDefault();

                if (adminFound != null)
                {
                    admin = adminFound;
                }
                else
                {
                    admin = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return admin;
        }
    }
}