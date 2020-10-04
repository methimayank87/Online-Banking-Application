using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using OnlineBankingApplication.Models;

namespace OnlineBankingApplication.Controllers
{
    [RoutePrefix("api/uploadaadhar")]
    public class AadharController : ApiController
    {
        [HttpPost]
        [Route("")]
        public HttpResponseMessage UploadAadhar()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Aadhar/" + imageName);
            postedFile.SaveAs(filePath);

            //Save to DB
            using (ProjectContext db = new ProjectContext())
            {
                AadharFile image = new AadharFile()
                {
                    UserID = Convert.ToInt32(httpRequest["UserID"]),
                    FileCaption = httpRequest["ImageCaption"],
                    FileName = imageName,
                    FileData = File.ReadAllBytes(filePath)
                };
                db.AadharFiles.Add(image);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(int id)
        {
            ProjectContext db = new ProjectContext();
            var data = from i in db.AadharFiles
                       where i.UserID == id
                       select i;
            AadharFile img = (AadharFile)data.SingleOrDefault();
            byte[] imgData = img.FileData;
            MemoryStream ms = new MemoryStream(imgData);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");
            return response;
        }
    }
}