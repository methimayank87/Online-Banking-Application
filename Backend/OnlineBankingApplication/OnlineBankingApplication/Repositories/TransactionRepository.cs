using OnlineBankingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineBankingApplication.Repositories
{
    public class TransactionRepository : ITransactionRepository<Transaction>
    {
        private readonly ProjectContext _projectContext;
        public TransactionRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(Transaction newtransaction)
        {
            _projectContext.transactions.Add(newtransaction);
            _projectContext.SaveChanges();
        }

        public void Delete(int transactionid)
        {
            Transaction trans = _projectContext.transactions.Find(transactionid);
            _projectContext.transactions.Remove(trans);
            _projectContext.SaveChanges();
        }

        public Transaction Get(int id)
        {
            return _projectContext.transactions.Find(id);
        }

        public IEnumerable<Transaction> GetAll()
        {
            return _projectContext.transactions.ToList();
        }

        public void Update(Transaction updatetrans)
        {
            _projectContext.Entry(updatetrans).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}