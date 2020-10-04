using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Mail;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class ApprovalRepository : IDataRepository<AdminApproval>
    {
        private readonly ProjectContext _projectContext;
        public ApprovalRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(AdminApproval newAprooval)
        {
            _projectContext.Approvals.Add(newAprooval);
            _projectContext.SaveChanges();
        }

        public void Delete(int id)
        {
            //User user = _projectContext.Users.Find(userId);
            //_projectContext.Users.Remove(user);
            //_projectContext.SaveChanges();
            throw new NotImplementedException();
        }

        public AdminApproval Get(int id)
        {
            return _projectContext.Approvals.Find(id);
        }
        public AdminApproval Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AdminApproval> GetAll()
        {
            var approvals = _projectContext.Approvals.ToList();
            return approvals;
        }

        public AdminApproval GetByAccount(long id)
        {
            throw new NotImplementedException();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(AdminApproval updateApproval)
        {
            _projectContext.Entry(updateApproval).State = EntityState.Modified;
            _projectContext.SaveChanges();
            if (updateApproval.ApprovalStatus == "cancelled")
            {
                var user = _projectContext.Users
                                    .Where(u => u.UserID == updateApproval.UserID)
                                    .FirstOrDefault();
                MailClass mail = new MailClass();
                mail.subject = "Account Rejected";
                mail.message = "Sorry! Your account has been rejected because of one or more issues. We are sorry for the inconvenience caused.\nKindly register yourself again with proper details to be part of our bank\nThank you.";
                string res = PostSendMail(user, mail);
            }
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