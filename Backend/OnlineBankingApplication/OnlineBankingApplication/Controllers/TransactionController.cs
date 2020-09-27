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
        private ITransactionRepository<Transaction> _transrepository;
        public TransactionController()
        {
            this._transrepository = new TransactionRepository(new ProjectContext());
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<Transaction> Gettransactions()
        {
            var trans = _transrepository.GetAll();
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
            return Ok(transaction);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeletUser(int id)
        {
            try
            {
                Transaction trans = _transrepository.Get(id);
                if (trans == null)
                {
                    return NotFound();
                }
                _transrepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateTransaction(int id, [FromBody] Transaction trans)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (trans == null)
            {
                return BadRequest("Transaction cannot null");
            }
            if (id != trans.TransactionID)
            {
                return BadRequest();
            }
            _transrepository.Update(trans);
            return Ok(trans);
        }
    }
}
