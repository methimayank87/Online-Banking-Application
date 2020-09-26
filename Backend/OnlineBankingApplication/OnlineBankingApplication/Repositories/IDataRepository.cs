using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBankingApplication.Repositories
{
    interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(int id);
        TEntity Get(string id);
        void Add(TEntity entity);
        void Update(TEntity dbEntity);
        void Delete(int entity);
    }
}