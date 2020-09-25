using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OnlineBankingApplication.Models;
using OnlineBankingApplication.Repositories;

namespace OnlineBankingApplication.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountController : ApiController
    {
        private IDataRepository<Account> _accountRepository;
        public AccountController()
        {
            this._accountRepository = new AccountRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<Account> GetAccounts()
        {
            var accounts = _accountRepository.GetAll();
            return accounts;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddAccount([FromBody] Account account)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _accountRepository.Add(account);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(account);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeletAccount(int id)
        {
            try
            {
                Account account = _accountRepository.Get(id);
                if (account == null)
                {
                    return NotFound();
                }
                _accountRepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateAccount(int id, [FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (account == null)
            {
                return BadRequest("Account is null");
            }
            if (id != account.UserID)
            {
                return BadRequest();
            }
            _accountRepository.Update(account);
            return Ok(account);
        }
    }
}
