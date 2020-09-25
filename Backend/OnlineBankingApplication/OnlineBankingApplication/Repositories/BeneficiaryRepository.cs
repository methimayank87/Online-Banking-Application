using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class BeneficiaryRepository : IDataRepository<Beneficiary>
    {
        private readonly ProjectContext _projectContext;
        public BeneficiaryRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(Beneficiary newBeneficiary)
        {
            _projectContext.Beneficiaries.Add(newBeneficiary);
            _projectContext.SaveChanges();
        }

        public void Delete(int id)
        {
            Beneficiary beneficiary = _projectContext.Beneficiaries.Find(id);
            _projectContext.Beneficiaries.Remove(beneficiary);
            _projectContext.SaveChanges();
        }

        public Beneficiary Get(int id)
        {
            return _projectContext.Beneficiaries.Find(id);
        }
        public Beneficiary Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Beneficiary> GetAll()
        {
            return _projectContext.Beneficiaries.ToList();
        }

        public void Update(Beneficiary updateBeneficiary)
        {
            _projectContext.Entry(updateBeneficiary).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}