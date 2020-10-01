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
    public class LoginController : ApiController
    {
        private LoginRepository _loginRepository;
        public LoginController()
        {
            this._loginRepository = new LoginRepository(new ProjectContext());
        }

        [HttpPost]
        [Route("api/login")]
        public IHttpActionResult VerifyLogin(Login login)
        {
            Account account = null;
            try
            {
                account = _loginRepository.VerifyLogin(login.Id, login.Password);
                if (account == null)
                    return NotFound();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            var otp = _loginRepository.postSendMsg(account);
            return Ok(otp);
        }
    }
}
