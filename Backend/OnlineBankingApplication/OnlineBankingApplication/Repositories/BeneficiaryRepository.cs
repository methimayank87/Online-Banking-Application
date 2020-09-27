﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Repositories
{
    public class BeneficiaryRepository : IBeneficiaryRepository<Beneficiary>
    {
        private readonly ProjectContext _projectContext;
        public BeneficiaryRepository(ProjectContext projectContext)
        {
            _projectContext = projectContext;
        }

        public void Add(long id , Beneficiary newBeneficiary)
        {
            _projectContext.Beneficiaries.Add(newBeneficiary);
            _projectContext.SaveChanges();
        }

        public void Delete(long userAccount , long benAccount)
        {
            Beneficiary beneficiary = (Beneficiary)_projectContext.Beneficiaries
                                            .Where(u => u.UserAccountNumber == userAccount && u.BenAccountNumber == benAccount)
                                            .FirstOrDefault();
            _projectContext.Beneficiaries.Remove(beneficiary);
            _projectContext.SaveChanges();
        }

        public Beneficiary Get(long userAccount, long benAccount)
        {
            var beneficiary = _projectContext.Beneficiaries
                                    .Where(u => u.UserAccountNumber == userAccount && u.BenAccountNumber == benAccount)
                                    .FirstOrDefault();
            return beneficiary;
        }
        public IEnumerable<Beneficiary> GetAll(long number)
        {
            var beneficiaries = _projectContext.Beneficiaries
                                     .Where(u => u.UserAccountNumber == number);
            return beneficiaries.ToList();
        }

        public void Update(Beneficiary updateBeneficiary)
        {
            _projectContext.Entry(updateBeneficiary).State = EntityState.Modified;
            _projectContext.SaveChanges();
        }
    }
}