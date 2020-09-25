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
    [RoutePrefix("api/accounts/{id}/beneficiaries")]
    public class BeneficiaryController : ApiController
    {
        private IBeneficiaryRepository<Beneficiary> _beneficiaryRepository;
        public BeneficiaryController()
        {
            this._beneficiaryRepository = new BeneficiaryRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<Beneficiary> GetBeneficiaries(string id)
        {
            return _beneficiaryRepository.GetAll(id);
        }
        [HttpGet]
        [Route("{benid}")]
        public Beneficiary GetBeneficiaryByID(string id, string benid)
        {
            return _beneficiaryRepository.Get(id , benid);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddBeneficiary(string id , [FromBody] Beneficiary beneficiary)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _beneficiaryRepository.Add(id , beneficiary);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(beneficiary);
        }

        [HttpDelete]
        [Route("{benid}")]
        public IHttpActionResult DeletBeneficiary(string id , string benid)
        {
            try
            {
                Beneficiary beneficiary = _beneficiaryRepository.Get(id , benid);
                if (beneficiary == null)
                {
                    return NotFound();
                }
                _beneficiaryRepository.Delete(id , benid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{benid}")]
        public IHttpActionResult UpdateAccount(string id, string benid, [FromBody] Beneficiary beneficiary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (beneficiary == null)
            {
                return BadRequest("Beneficiary is null");
            }
            if (id != beneficiary.BenAccountNumber)
            {
                return BadRequest();
            }
            _beneficiaryRepository.Update(beneficiary);
            return Ok(beneficiary);
        }
    }
}
