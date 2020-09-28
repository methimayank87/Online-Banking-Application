using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class UserRepository : IDataRepository<User>
    {
        private readonly ProjectContext _projectContext;
        public UserRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(User newUser)
        {
            _projectContext.Users.Add(newUser);
            _projectContext.SaveChanges();
        }

        public void Delete(int userId)
        {
            User user = _projectContext.Users.Find(userId);
            _projectContext.Users.Remove(user);
            _projectContext.SaveChanges();
        }

        public User Get(int id)
        {
            return _projectContext.Users.Find(id);
        }
        public User Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            return _projectContext.Users.ToList();
        }

        public void Update(User updateUser)
        {
            _projectContext.Entry(updateUser).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
        public string SendMail(string id)
        {
            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            // setup Smtp authentication
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("mayank.demomail@gmail.com", "mayank123");
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;
            //int demo = 0;
            //can be obtained from your model
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("mayank.demomail@gmail.com");
            msg.To.Add(new MailAddress(id));
            msg.Subject = "User Registration Successful";
            msg.IsBodyHtml = true;
            msg.Body = string.Format("<html><head></ head ><body><p>Dear Customer,</p> <p>Welcome to HDFC Bank and thank you for opening a digital account with HDFC Bank.As a valued customer, you now have access to a host of world class banking products and services.</p><p>Some important information about your digital account with us is as follows:<br>Customer Identification Number : ###l_Customer ID### <br>Type of account : Savings Account</p><p>Click on the below link to set your internet banking password.</p><br><a href='https://www.w3schools.com'>Click here!</a></body>");
            try
            {
                client.Send(msg);
                return "OK";
            }
            catch (Exception ex)
            {
                return "error:" + ex.ToString();
            }
        }
        public string getMailByID(int id)
        {
            var mail = from u in _projectContext.Users
                          where u.UserID == id
                          select u.Email;
            return mail.ToString();
        }
        public User getUserByAccount(long num)
        {
            var account = _projectContext.Accounts
                        .Where(u => u.AccountNumber == num)
                        .FirstOrDefault();

            var user = _projectContext.Users
                            .Where(u => u.UserID == account.UserID)
                            .FirstOrDefault();
            return user;
        }

        public User GetByAccount(long id)
        {
            throw new NotImplementedException();
        }
        public string postSendMsg(User user)
        {
            string number = user.Phone;
            string msg = "Dear customer, Thank you for creating an account with us. We hope to provide you the best services.";
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

                return "Ok";
            }
            catch (Exception ex)
            {
                return "error:" + ex.ToString();
            }
        }
        public string postSendOtp(User user)
        {
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