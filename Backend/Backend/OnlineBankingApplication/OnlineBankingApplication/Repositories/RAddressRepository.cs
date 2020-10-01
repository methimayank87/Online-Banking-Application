using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class RAddressRepository : IDataRepository<RAddress>
    {
        private readonly ProjectContext _projectContext;
        public RAddressRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(RAddress newAddress)
        {
            _projectContext.rAddresses.Add(newAddress);
            _projectContext.SaveChanges();
        }
        public void Delete(int id)
        {
            RAddress address = (RAddress)_projectContext.rAddresses
                                            .Where(u => u.UserID == id)
                                            .FirstOrDefault();
            _projectContext.rAddresses.Remove(address);
            _projectContext.SaveChanges();
        }
        public RAddress Get(int id)
        {
            var address = _projectContext.rAddresses
                                    .Where(u => u.UserID == id)
                                    .FirstOrDefault();
            return address;
        }
        public RAddress Get(string id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<RAddress> GetAll()
        {
            return _projectContext.rAddresses.ToList();
        }

        public RAddress GetByAccount(long id)
        {
            throw new NotImplementedException();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(RAddress updateAddress)
        {
            _projectContext.Entry(updateAddress).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}