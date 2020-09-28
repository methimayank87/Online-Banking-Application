using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly ProjectContext _projectContext;
        public LoginRepository(ProjectContext projectContext)
        {
            this._projectContext = projectContext;
        }
        public Account VerifyLogin(int id, string password)
        {
            Account account = null;
            try
            {
                var accountFound = _projectContext.Accounts
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
        public string postSendMsg(Account account)
        {
            var user = _projectContext.Users
                            .Where(u => u.UserID == account.UserID)
                            .FirstOrDefault();
            Random rnd = new Random();
            int otp = rnd.Next(1000, 9999);
            string number = user.Phone;
            string msg = "Verification code for your application is " + otp.ToString() + ". This code is only for your identity verification purpose.";
            string result;
            string msg1 = System.Web.HttpUtility.UrlEncode(msg);
            using (var wb = new WebClient())
            {
                byte[] response = wb.UploadValues("https://api.textlocal.in/send/", new NameValueCollection()
                {
                    {"apikey" , "DIxUCj3h3Kc-U9R0hDslA2ZrR4wDSN7XYxLfMISpdz" },
                    {"numbers", number},
                    {"message", msg1 },
                    {"sender", "TXTLCL" }

                });
                result = System.Text.Encoding.UTF8.GetString(response);
            }
            try
            {

                return otp.ToString();
            }
            catch (Exception ex)
            {
                return "error:" + ex.ToString();
            }
        }
    }
}