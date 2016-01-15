package controllers;

import java.io.File;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import play.Logger;
import play.mvc.Controller;
import play.mvc.Http.Request;
import play.mvc.Result;
import views.html.index;
import java.util.*;
public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
    
    public Result resource(String filePath) {
        String physicalPath = "public" + File.separator;
        String openid = session().get("openid");
        Request request = request();
        if (openid == null) {
          String url = "http://";
          url +=  request.host();
          url +=  request.path();
          request();
          
          return redirect("http://test.24-7.com.cn/verify?url="+ url);
        } else {
          return ok(new File(physicalPath + filePath));
        }
    }
    

  private String sendGetRequest(String url) {

    DefaultHttpClient client = new DefaultHttpClient();

    HttpGet getMethod = new HttpGet(url);

    String retStr = "";

    try {

      HttpResponse response = client.execute(getMethod);

      if (response.getStatusLine().getStatusCode() == 200) {

        retStr = EntityUtils.toString(response.getEntity());

      }

    }

    catch (Throwable e) {

    }

    return retStr;

  }
}
