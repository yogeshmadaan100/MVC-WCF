using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Web.SessionState;
using System.Web.Security;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI;
using System.Web.ClientServices;

namespace WcfService1
{

    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public string GetData(String email , string password)
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["MVCConnectionString"].ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from [User] where EMail =@EMail and PhoneNo =@PhoneNo", con);
            cmd.Parameters.AddWithValue("@EMail", email);
            cmd.Parameters.AddWithValue("@PhoneNo", password);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return ("true");
            }
            else
            {
                return ("false");
            }
            
        }

       
    }
}
