using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class UserRepository : IDataRepository<User>
    {
        private readonly ProjectContext _projectContext;
        public UserRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(User newUser)
        {
            _projectContext.Users.Add(newUser);
            _projectContext.SaveChanges();
        }

        public void Delete(int userId)
        {
            User user = _projectContext.Users.Find(userId);
            _projectContext.Users.Remove(user);
            _projectContext.SaveChanges();
        }

        public User Get(int id)
        {
            return _projectContext.Users.Find(id);
        }
        public User Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            return _projectContext.Users.ToList();
        }

        public void Update(User updateUser)
        {
            _projectContext.Entry(updateUser).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}