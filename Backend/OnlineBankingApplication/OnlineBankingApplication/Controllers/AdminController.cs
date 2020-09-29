﻿using System;
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
            foreach(var u in users)
            {
                var otp = _adminRepository.postSendMsg(u , message);
                return Ok(otp);
            }
            return Ok("Message not sent.");
        }

        [HttpPost]
        [Route("bulkmail")]
        public IHttpActionResult BulkMail([FromBody] string message)
        {
            var users = _adminRepository.GetUsers();
            foreach (var u in users)
            {
                var msg = _adminRepository.PostSendMail(u, message);
                return Ok(msg);
            }
            return Ok("Message not sent.");
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
    }
}
