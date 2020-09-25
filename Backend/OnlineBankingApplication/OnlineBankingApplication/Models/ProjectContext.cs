using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineBankingApplication.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext() : base("name = gladiatorDBEntities")
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Beneficiary> Beneficiaries { get; set; }
        public DbSet<AdminApproval> Approvals { get; set; }
    }
}