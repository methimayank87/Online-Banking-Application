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
    [RoutePrefix("api/adminapprovals")]
    public class ApprovalController : ApiController
    {
        private IDataRepository<AdminApproval> _approvalRepository;
        public ApprovalController()
        {
            this._approvalRepository = new ApprovalRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<AdminApproval> GetApprovals()
        {
            var approvals = _approvalRepository.GetAll();
            return approvals;
        }

        [HttpGet]
        [Route("{id}")]
        public AdminApproval GetAprovalById(int id)
        {
            var approval = _approvalRepository.Get(id);
            return approval;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddApproval([FromBody] AdminApproval adminApproval)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _approvalRepository.Add(adminApproval);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(adminApproval);
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateApproval(int id, [FromBody] AdminApproval approval)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (approval == null)
            {
                return BadRequest("User is null");
            }
            if (id != approval.ApprovalID)
            {
                return BadRequest();
            }
            _approvalRepository.Update(approval);
            //if (approval.ApprovalStatus == "yes")
            //{

            //}
            return Ok(approval);
        }
    }
}