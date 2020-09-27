using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class PAddressRepository : IDataRepository<PAddress>
    {
        private readonly ProjectContext _projectContext;
        public PAddressRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(PAddress newAddress)
        {
            _projectContext.pAddresses.Add(newAddress);
            _projectContext.SaveChanges();
        }
        public void Delete(int id)
        {
            PAddress address = (PAddress)_projectContext.pAddresses
                                            .Where(u => u.UserID == id)
                                            .FirstOrDefault();
            _projectContext.pAddresses.Remove(address);
            _projectContext.SaveChanges();
        }
        public PAddress Get(int id)
        {
            var address = _projectContext.pAddresses
                                    .Where(u => u.UserID == id)
                                    .FirstOrDefault();
            return address;
        }
        public PAddress Get(string id)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<PAddress> GetAll()
        {
            return _projectContext.pAddresses.ToList();
        }

        public string SendMail(string entity)
        {
            throw new NotImplementedException();
        }

        public void Update(PAddress updateAddress)
        {
            _projectContext.Entry(updateAddress).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}