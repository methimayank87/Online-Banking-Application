using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
            return _projectContext.Approvals.ToList();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(AdminApproval updateApproval)
        {
            _projectContext.Entry(updateApproval).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}