using OnlineBankingApplication.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Net;
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
        public IEnumerable<Transaction> GetByDate(DateClass date,long id)
        {
            var transactions = from trans in _projectContext.transactions
                               where ((trans.SenderAccount == id && (trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate)) || (trans.ReceiverAccount == id && (trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate)))
                               orderby trans.TransactionDate descending
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
        public string postSendOtp(long num)
        {
            var account = _projectContext.Accounts
                        .Where(u => u.AccountNumber == num)
                        .FirstOrDefault();

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
                    {"apikey" , "W4fdhZ2wl6E-3exO4Gmo9wmjR8eNXAgsvS3tNsgNWT" },
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