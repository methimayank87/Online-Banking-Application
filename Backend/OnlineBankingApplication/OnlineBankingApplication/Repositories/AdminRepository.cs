using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
    }
}