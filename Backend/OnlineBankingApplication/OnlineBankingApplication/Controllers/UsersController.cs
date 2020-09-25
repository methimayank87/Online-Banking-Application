using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using OnlineBankingApplication.Models;
using OnlineBankingApplication.Repositories;

namespace OnlineBankingApplication.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private IDataRepository<User> _userRepository;
        public UserController()
        {
            this._userRepository = new UserRepository(new ProjectContext());
        }
        [HttpGet]
        [Route("")]
        public IEnumerable<User> GetUsers()
        {
            var users = _userRepository.GetAll();
            return users;
        }

        [HttpGet]
        [Route("{id}")]
        public User GetUserById(int id)
        {
            var user = _userRepository.Get(id);
            return user;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult AddUser([FromBody] User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _userRepository.Add(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult DeletUser(int id)
        {
            try
            {
                User user = _userRepository.Get(id);
                if (user == null)
                {
                    return NotFound();
                }
                _userRepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok("Record is deleted!");
        }

        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult UpdateUser(int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (user == null)
            {
                return BadRequest("User is null");
            }
            if (id != user.UserID)
            {
                return BadRequest();
            }
            _userRepository.Update(user);
            return Ok(user);
        }
    }
}