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
        private ILoginRepository _accountRepository;
        public AccountController()
        {
            this._accountRepository = new LoginRepository(new ProjectContext());
        }

        [HttpPost]
        [Route("login")]
        public IHttpActionResult VerifyLogin(Login login)
        {
            Account account = null;
            try
            {
                account = _accountRepository.VerifyLogin(login.UserId, login.Password);
                if (account == null)
                    return NotFound();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(account);
        }
    }
}
