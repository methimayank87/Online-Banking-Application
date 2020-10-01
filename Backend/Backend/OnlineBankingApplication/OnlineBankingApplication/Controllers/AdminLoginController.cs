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
    [RoutePrefix("api/adminlogin")]
    public class AdminLoginController : ApiController
    {
        private AdminLoginRepository _adminloginRepository;
        public AdminLoginController()
        {
            this._adminloginRepository = new AdminLoginRepository(new ProjectContext());
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult VerifyLogin(Login login)
        {
            Admin admin = null;
            try
            {
                admin = _adminloginRepository.VerifyLogin(login.Id, login.Password);
                if (admin == null)
                    return NotFound();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(admin);
        }
    }
}
