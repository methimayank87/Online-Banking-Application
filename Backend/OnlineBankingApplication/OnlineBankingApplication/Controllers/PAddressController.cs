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
    [RoutePrefix("api/paddresses")]
    public class PAddressController : ApiController
    {
        private IDataRepository<PAddress> _addressRepository;
        public PAddressController()
        {
            this._addressRepository = new PAddressRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<PAddress> GetAddresses()
        {
            var addresses = _addressRepository.GetAll();
            return addresses;
        }

        [HttpGet]
        [Route("{id}")]
        public PAddress GetAddressById(int id)
        {
            var address = _addressRepository.Get(id);
            return address;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddAddress([FromBody] PAddress address)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _addressRepository.Add(address);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(address);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeletAddress(int id)
        {
            try
            {
                PAddress address = _addressRepository.Get(id);
                if (address == null)
                {
                    return NotFound();
                }
                _addressRepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateAddress(int id, [FromBody] PAddress address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (address == null)
            {
                return BadRequest("User is null");
            }
            if (id != address.UserID)
            {
                return BadRequest();
            }
            _addressRepository.Update(address);
            return Ok(address);
        }
    }
}
