using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBankingApplication.Repositories
{
    interface IBeneficiaryRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll(string entity);
        TEntity Get(string entity , string entity1);
        void Add(string entity , TEntity entity1);
        void Update(TEntity dbEntity);
        void Delete(string entity , string entity1);
    }
}
