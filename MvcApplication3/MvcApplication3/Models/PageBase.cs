using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApplication3.Models
{
    public class PageBase : System.Web.UI.Page
    {

        protected override void OnPreRender(EventArgs e)
        {

            base.OnPreRender(e);

            AutoRedirect();

        }

        public  void AutoRedirect()
        {

            int int_MilliSecondsTimeOut = (this.Session.Timeout * 60000);

        
           
        }

    }
}