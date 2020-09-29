using OnlineBankingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineBankingApplication.Repositories
{
    public class TransactionRepository
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
        public Transaction Get(int id)
        {
            return _projectContext.transactions.Find(id);
        }

        public IEnumerable<Transaction> GetAll(long id)
        {
            var transactions = from trans in _projectContext.transactions
                        where (trans.SenderAccount == id || trans.ReceiverAccount == id)
                        select trans;
            return transactions.ToList();
        }

        public int UpdateBalance(Transaction transaction)
        {
            var sendAcc = _projectContext.Accounts
                                .Where(acc => acc.AccountNumber == transaction.SenderAccount)
                                .FirstOrDefault();
            var recAcc = _projectContext.Accounts
                                .Where(acc => acc.AccountNumber == transaction.ReceiverAccount)
                                .FirstOrDefault();
            if(sendAcc.Balance >= transaction.Amount)
            {
                sendAcc.Balance -= transaction.Amount;
                recAcc.Balance += transaction.Amount;
                _projectContext.SaveChanges();
            }
            else
            {
                return 500;
            }
            return 200;
        }
    }
}