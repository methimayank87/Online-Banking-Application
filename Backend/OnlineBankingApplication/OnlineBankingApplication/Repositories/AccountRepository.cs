using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
            return _projectContext.Accounts.Find(id);
        }

        public IEnumerable<Account> GetAll()
        {
            return _projectContext.Accounts.ToList();
        }

        public void Update(Account updateAccount)
        {
            _projectContext.Entry(updateAccount).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }       
    }
}
