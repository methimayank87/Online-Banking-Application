using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class AdminRepository : IDataRepository<Admin>
    {
        private readonly ProjectContext _projectContext;
        public AdminRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(Admin newAdmin)
        {
            _projectContext.Admins.Add(newAdmin);
            _projectContext.SaveChanges();
        }
        public void Delete(int id)
        {
            Admin admin = _projectContext.Admins.Find(id);
            _projectContext.Admins.Remove(admin);
            _projectContext.SaveChanges();
        }

        public Admin Get(int id)
        {
            return _projectContext.Admins.Find(id);
        }
        public Admin Get(string id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Admin> GetAll()
        {
            return _projectContext.Admins.ToList();
        }

        public Admin GetByAccount(long id)
        {
            throw new NotImplementedException();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Admin updateAdmin)
        {
            _projectContext.Entry(updateAdmin).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _projectContext.Users.ToList();
        }
        public string postSendMsg(User user , string message)
        {
            string number = user.Phone;
            string msg = message;
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
        public string PostSendMail(User user,MailClass temp)
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
            msg.To.Add(new MailAddress(user.Email));
            msg.Subject = temp.subject;
            msg.IsBodyHtml = true;
            msg.Body = temp.message;
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
    }
}