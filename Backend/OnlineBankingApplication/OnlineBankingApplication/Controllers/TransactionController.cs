using OnlineBankingApplication.Models;
using OnlineBankingApplication.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Util;

namespace OnlineBankingApplication.Controllers
{
    [RoutePrefix("api/transactions")]
    public class TransactionController : ApiController
    {
        private TransactionRepository _transrepository;
        public TransactionController()
        {
            this._transrepository = new TransactionRepository(new ProjectContext());
        }

        [HttpGet]
        [Route("accounts/{id}")]
        public IEnumerable<Transaction> Gettransactions(long id)
        {
            var trans = _transrepository.GetAll(id);
            return trans;
        }

        [HttpGet]
        [Route("accounts/{id}/getbydate")]
        public IEnumerable<Transaction> GettransactionsByDate([FromBody] DateClass date, long id)
        {
            var trans = _transrepository.GetByDate(date,id);
            return trans;
        }

        [HttpGet]
        [Route("{id}")]
        public Transaction GetTransactionsbyId(int id)
        {
            var trans = _transrepository.Get(id);
            return trans;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddTransaction([FromBody] Transaction transaction)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _transrepository.Add(transaction);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            int res = _transrepository.UpdateBalance(transaction);
            return Ok(res);
        }
    }
}
