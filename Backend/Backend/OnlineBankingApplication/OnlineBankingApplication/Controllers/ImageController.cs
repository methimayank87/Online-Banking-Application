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
    [RoutePrefix("api/uploadimage")]
    public class ImageController : ApiController
    {
        [HttpPost]
        [Route("")]
        public HttpResponseMessage UploadImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
            postedFile.SaveAs(filePath);

            //Save to DB
            using (ProjectContext db = new ProjectContext())
            {
                Image image = new Image()
                {
                    UserID = Convert.ToInt32(httpRequest["UserID"]),
                    ImageCaption = httpRequest["ImageCaption"],
                    ImageName = imageName
                };
                db.Images.Add(image);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage ImageGet(int id)
        {
            ProjectContext _projectContext = new ProjectContext();
            var response = Request.CreateResponse(HttpStatusCode.OK);
            //var name = Convert.ToString(from data in _projectContext.Images
            //            where data.UserID == id
            //            select data.ImageName);
            var path = "~Image/Ramro - Web - 204910152.jpg";

            string regexSearch = new string(Path.GetInvalidFileNameChars()) + new string(Path.GetInvalidPathChars());
            Regex r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
            path = r.Replace(path, "");

            path = System.Web.Hosting.HostingEnvironment.MapPath(path);
            var ext = System.IO.Path.GetExtension(path);
            var contents = System.IO.File.ReadAllBytes(path);
            System.IO.MemoryStream ms = new System.IO.MemoryStream(contents);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/" + ext);
            return response;
        }
    }
}