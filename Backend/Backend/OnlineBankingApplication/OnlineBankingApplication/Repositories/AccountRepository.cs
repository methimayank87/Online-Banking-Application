using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Mail;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class AccountRepository : IDataRepository<Account>
    {
        private readonly ProjectContext _projectContext;
        public AccountRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(Account newAccount)
        {
            _projectContext.Accounts.Add(newAccount);
            _projectContext.SaveChanges();
        }

        public void Delete(int id)
        {
            Account account = _projectContext.Accounts.Find(id);
            _projectContext.Accounts.Remove(account);
            _projectContext.SaveChanges();
        }

        public Account Get(int id)
        {
            var account = (Account)_projectContext.Accounts
                                .Where(u => u.UserID == id)
                                .FirstOrDefault();
            return account;
        }
        public Account GetByAccount(long id)
        {
            return _projectContext.Accounts.Find(id);
        }

        public IEnumerable<Account> GetAll()
        {
            return _projectContext.Accounts.ToList();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Account updateAccount)
        {
            _projectContext.Entry(updateAccount).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
        public string PostSendMail(User user, MailClass temp)
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