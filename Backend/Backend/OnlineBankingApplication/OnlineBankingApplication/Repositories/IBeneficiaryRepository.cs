using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineBankingApplication.Repositories
{
    interface IBeneficiaryRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll(long entity);
        TEntity Get(long entity , long entity1);
        void Add(long entity , TEntity entity1);
        void Update(TEntity dbEntity);
        void Delete(long entity , long entity1);
    }
}
