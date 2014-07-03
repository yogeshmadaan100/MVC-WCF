using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using System.Web.Security;
using MvcApplication3.Models;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI;
using System.Web.ClientServices;
using System.ServiceModel;



namespace MvcApplication3.Controllers
{
    [SessionState(SessionStateBehavior.Default)]
    public class MyController : Controller
    {
        //
        // GET: /My/

        public ActionResult Index()
        {
            if ((Object)Session["UserId"] == null)
                return RedirectToAction("Login");
            TempData["Message"] = "Controlling Sessions";
            var dbContext = new MyDBDataContext();
            var userList = from user in dbContext.Users select user;
            var users = new List<MvcApplication3.Models.User>();
            if(userList.Any())
            {
                foreach(var user in userList)
                {
                    users.Add(new MvcApplication3.Models.User() { UserId = user.UserId, Address = user.Address, Company = user.Company, EMail = user.EMail, FirstName = user.FirstName, LastName = user.LastName, PhoneNo = user.PhoneNo });
                }
            }
            return View(users);
        }
        
        [HttpPost]
        public ActionResult Index(SessionModel info)
        {
            Session["UserId"] = info.EMail;
            return RedirectToAction("UserSection");
        }
        public ActionResult UserSection()
        {
            var Data_Session = new SessionModel();
            
                if ((Object)Session["UserId"] != null)
                    Data_Session.Session_Value = "Welcome " + Session["UserId"].ToString();
                else
                    Data_Session.Session_Value = "Session Expired";
            
            return View(Data_Session);
        }
        //
        // GET: /My/Details/5

        public ActionResult Details(int? id)
        {
            var dbContext = new MyDBDataContext();
            var userDetails = dbContext.Users.FirstOrDefault(userId => userId.UserId == id);
            var user = new MvcApplication3.Models.User();
            if (userDetails != null)
            {
                user.UserId = userDetails.UserId;
                user.FirstName = userDetails.FirstName;
                user.LastName = userDetails.LastName;
                user.Address = userDetails.Address;
                user.PhoneNo = userDetails.PhoneNo;
                user.EMail = userDetails.EMail;
                user.Company = userDetails.Company;
                user.Designation = userDetails.Designation;
            }
            ViewBag.FirstName = "My First Name";
            ViewData["FirstName"] = "My First Name";
            if (TempData.Any())
            {
                var tempData = TempData["TempData Name"];
            }
            return View(user);
        }

        //
        // GET: /My/Create
        
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /My/Create

        [HttpPost]
        public ActionResult Create(User user)
        {
            try
            {
                var dbContext = new MyDBDataContext();
              
                dbContext.Users.InsertOnSubmit(user);
                dbContext.SubmitChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /My/Edit/5

        public ActionResult Edit(int? id)
        {
            if ((Object)Session["UserId"] == null)
                return RedirectToAction("Login");
            var dbContext = new MyDBDataContext();
            var userDetails = dbContext.Users.FirstOrDefault(userId => userId.UserId == id);
            var user = new MvcApplication3.Models.User();
            if (userDetails != null)
            {
                user.UserId = userDetails.UserId;
                user.FirstName = userDetails.FirstName;
                user.LastName = userDetails.LastName;
                user.Address = userDetails.Address;
                user.PhoneNo = userDetails.PhoneNo;
                user.EMail = userDetails.EMail;
                user.Company = userDetails.Company;
                user.Designation = userDetails.Designation;
            }
            return View(user);
        }

        //
        // POST: /My/Edit/5

        [HttpPost]
        public ActionResult Edit(int? id, User userDetails)
        {
            TempData["TempData Name"] = "Akhil";

            try
            {
                var dbContext = new MyDBDataContext();
                var user = dbContext.Users.FirstOrDefault(userId => userId.UserId == id);
                if (user != null)
                {
                    user.FirstName = userDetails.FirstName;
                    user.LastName = userDetails.LastName;
                    user.Address = userDetails.Address;
                    user.PhoneNo = userDetails.PhoneNo;
                    user.EMail = userDetails.EMail;
                    user.Company = userDetails.Company;
                    user.Designation = userDetails.Designation;
                    dbContext.SubmitChanges();
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        } 

        //
        // GET: /My/Delete/5

        public ActionResult Delete(int? id)
        {
            if ((Object)Session["UserId"] == null)
                return RedirectToAction("Login");
            var dbContext = new MyDBDataContext();
            var user = new MvcApplication3.Models.User();
            var userDetails = dbContext.Users.FirstOrDefault(userId => userId.UserId == id);
            if (userDetails != null)
            {
                user.FirstName = userDetails.FirstName;
                user.LastName = userDetails.LastName;
                user.Address = userDetails.Address;
                user.PhoneNo = userDetails.PhoneNo;
                user.EMail = userDetails.EMail;
                user.Company = userDetails.Company;
                user.Designation = userDetails.Designation;
            }
            return View(user);
        }

        //
        // POST: /My/Delete/5

        [HttpPost]
        public ActionResult Delete(int? id, User userDetails)
        {
            try
            {
                var dbContext = new MyDBDataContext();
                var user = dbContext.Users.FirstOrDefault(userId => userId.UserId == id);
                if (user != null)
                {
                    dbContext.Users.DeleteOnSubmit(user);
                    dbContext.SubmitChanges();
                }

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public ActionResult Slider()
        {
            List <ImageModel>imageList = new List<ImageModel>();
            imageList.Add(new ImageModel { ImageID = 1, ImageName = "Image 1", ImagePath = "/img/1.jpg" });
            imageList.Add(new ImageModel{  ImageID = 2, ImageName = "Image 2", ImagePath = "/img/2.jpg" });
            imageList.Add(new ImageModel { ImageID = 3, ImageName = "Image 3", ImagePath = "/img/3.jpg" });
            imageList.Add(new ImageModel { ImageID = 4, ImageName = "Image 4", ImagePath = "/img/4.jpg" });
            imageList.Add(new ImageModel { ImageID = 5, ImageName = "Image 5", ImagePath = "/img/5.jpg" });
            return View(imageList);
        }

       [HttpGet]
        public ActionResult Login()
        {
            var Data_Session = new SessionModel();

            if ((Object)Session["UserId"] != null)
                return RedirectToAction("UserSection");
         
            return View();
               // return RedirectToAction("Index");
         
           
        }
          private bool IsValid(string email, string password)
{
    
    bool IsValid = false;
 
    using (var dbContext = new MyDBDataContext())
    {
        var user = dbContext.Users.FirstOrDefault(u => u.EMail == email);
        if (user != null)
        {
            if (user.PhoneNo==password)
            {
                IsValid = true;
            }
        }
    }
    return IsValid;
} 
    [HttpGet]
        public ActionResult Logout()
          {
                   
              Session["UserId"] = null;
             
              
             return RedirectToAction("Login");
          }
       
       [HttpPost]
        public ActionResult Login(User userDetails)
        {
            
                var dbContext = new MyDBDataContext();
                SessionModel info = new SessionModel();
                info.EMail = userDetails.EMail;
                info.PhoneNo = userDetails.PhoneNo;
           if(userDetails.EMail==null || userDetails.PhoneNo==null)
           {
               ModelState.AddModelError("", "Login details are wrong.");
               return View();
           }
                var user = dbContext.Users.FirstOrDefault(EMail => EMail.EMail == userDetails.EMail);
                ServiceReference1.Service1Client obj1 = new ServiceReference1.Service1Client();
                String response = obj1.GetData(userDetails.EMail, userDetails.PhoneNo);
                if (response=="true")
                {
                    ModelState.AddModelError("", "Login details are correct.");
                 
                    Session["UserId"] = info.EMail;
                    return RedirectToAction("UserSection");

                    // return RedirectToAction("Index");
                }
                else
                {
                    
                    ModelState.AddModelError("", "Login details are wrong.");
                    return View();
                    
                }
                
    return View(userDetails);
           
        }
    }
  
}
