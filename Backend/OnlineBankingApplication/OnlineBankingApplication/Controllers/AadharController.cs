using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Controllers
{
    public class AadharController : ApiController
    {
        [HttpPost]
        [Route("api/UploadAadhar")]
        public HttpResponseMessage UploadImage(int userId)
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["AadharFile"];
            //Create custom filename
            //imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
            postedFile.SaveAs(filePath);

            //Save to DB
            using (ProjectContext db = new ProjectContext())
            {
                AadharFile file = new AadharFile()
                {
                    UserID = userId,
                    FileCaption = httpRequest["ImageCaption"],
                    FileName = imageName
                };
                db.AadharFiles.Add(file);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
