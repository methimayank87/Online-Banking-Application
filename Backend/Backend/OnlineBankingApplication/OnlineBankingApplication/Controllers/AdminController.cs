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
    [RoutePrefix("api/admins")]
    public class AdminController : ApiController
    {
        private AdminRepository _adminRepository;
        public AdminController()
        {
            this._adminRepository = new AdminRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<Admin> GetAdmins()
        {
            var admins = _adminRepository.GetAll();
            return admins;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddAdmin([FromBody] Admin admin)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _adminRepository.Add(admin);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(admin);
        }

        [HttpPost]
        [Route("bulksms")]
        public IHttpActionResult BulkSms([FromBody] string message)
        {
            var users = _adminRepository.GetUsers();
            var otp = "";
            foreach (var u in users)
            {
                otp = _adminRepository.postSendMsg(u, message);
            }
            return Ok(otp);
        }

        [HttpPost]
        [Route("bulkmail")]
        public IHttpActionResult BulkMail([FromBody] MailClass message)
        {
            var users = _adminRepository.GetUsers();
            var msg = "";
            foreach (var u in users)
            {
                msg = _adminRepository.PostSendMail(u, message);
            }
            return Ok(msg);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeleteAdmin(int id)
        {
            try
            {
                Admin admin = _adminRepository.Get(id);
                if (admin == null)
                {
                    return NotFound();
                }
                _adminRepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateAdmin(int id, [FromBody] Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (admin == null)
            {
                return BadRequest("User is null");
            }
            if (id != admin.AdminID)
            {
                return BadRequest();
            }
            _adminRepository.Update(admin);
            return Ok(admin);
        }

        //[HttpGet]
        //[Route("infocharts")]
        //public List<> GetUserChartInfo()
        //{
        //    ProjectContext _projectContext = new ProjectContext();
        //    UserChart userChart = new UserChart();
        //    var userData = from p in _projectContext.Users.GroupBy(p => p.DateOfApplication)
        //                     select new
        //                     {
        //                         count = p.Count(),
        //                         p.First().DateOfApplication,
        //                     };
        //    var transactionCounts = from temp in _projectContext.transactions
        //                            group temp by temp.TransactionDate into g
        //                            select g.Count();
        //    return userData.ToList();
        //}
        [HttpPost]
        [Route("countusersbydate")]
        public int GetCountUsers([FromBody] DateClass date)
        {
            ProjectContext _projectContext = new ProjectContext();
            int countUsers = (from trans in _projectContext.Users
                              where (trans.DateOfApplication >= date.startDate && trans.DateOfApplication <= date.endDate)
                              select trans).Count();
            return countUsers;
        }
        [HttpPost]
        [Route("counttransbydate")]
        public int GetCountTransactions([FromBody] DateClass date)
        {
            ProjectContext _projectContext = new ProjectContext();
            int countTrans = (from trans in _projectContext.transactions
                              where (trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate)
                              select trans).Count();
            return countTrans;
        }
        [HttpPost]
        [Route("countamountbydateimps")]
        public int GetTransactionAmountI([FromBody] DateClass date)
        {
            ProjectContext _projectContext = new ProjectContext();
            int countSum = 0;
            countSum = (from trans in _projectContext.transactions
                        where ((trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate) && (trans.TransactionMode == "imps"))
                        select trans.Amount).Sum();
            return countSum;
        }
        [HttpPost]
        [Route("countamountbydatertgs")]
        public int GetTransactionAmountR([FromBody] DateClass date)
        {
            ProjectContext _projectContext = new ProjectContext();
            int countSum = 0;
            countSum = (from trans in _projectContext.transactions
                        where ((trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate) && (trans.TransactionMode == "rtgs"))
                        select trans.Amount).Sum();
            return countSum;
        }
        [HttpPost]
        [Route("countamountbydateneft")]
        public int GetTransactionAmountN([FromBody] DateClass date)
        {
            ProjectContext _projectContext = new ProjectContext();
            int countSum = 0;
            countSum = (from trans in _projectContext.transactions
                        where ((trans.TransactionDate >= date.startDate && trans.TransactionDate <= date.endDate) && (trans.TransactionMode == "neft"))
                        select trans.Amount).Sum();
            return countSum;
        }
    }
}