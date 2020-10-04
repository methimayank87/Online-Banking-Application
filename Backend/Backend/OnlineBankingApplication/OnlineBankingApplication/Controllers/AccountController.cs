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
        private AccountRepository _accountRepository;
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

        [HttpGet]
        [Route("{id}")]
        public Account GetAccountById(long id)
        {
            var account = _accountRepository.GetByAccount(id);
            return account;
        }

        [HttpGet]
        [Route("getbyid/{id}")]
        public Account GetAccountById(int id)
        {
            var account = _accountRepository.Get(id);
            return account;
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
            ProjectContext _projectContext = new ProjectContext();
            var user = _projectContext.Users
                            .Where(u => u.UserID == account.UserID)
                            .FirstOrDefault();
            MailClass mail = new MailClass();
            mail.subject = "Account Approved";
            mail.message = "Congratulations! Your account has been approved.\nUse these credentials to login into your account.\n" + "UserID : " + account.UserID + "\n" + "Login Password : " + account.LoginPassword;
            string res = _accountRepository.PostSendMail(user, mail);
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