using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace OnlineBankingApplication.Models
{
    public class Demo : IdentityUser
    {
        public string MyExtraProperty { get; set; }
    }
}