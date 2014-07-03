using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MvcApplication3.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string EMail { get; set; }
        public string Address { get; set; }
        [Required(ErrorMessage = "Phone No is required")]
        [StringLength(10,MinimumLength=10,ErrorMessage="Phone no must be of 10 Digits")]
        public string PhoneNo { get; set; }
        public string Company { get; set; }
        public string Designation { get; set; } 
    }
}