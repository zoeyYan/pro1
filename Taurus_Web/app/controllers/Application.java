package controllers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Map;
import java.util.Map.Entry;

import play.*;
import play.data.DynamicForm;
import play.data.Form;
import play.i18n.Messages;
import play.mvc.*;
import views.html.*;

public class Application extends Controller {

    public static Result index() {
        StringBuilder sb = new StringBuilder();
        sb.append("Not logged in.\n");
        for (Entry<String, String> entry : session().entrySet()) {
            sb.append("key:" + entry.getKey() + " value: " + entry.getValue());
        }
        
        if (session("userId") != null) {
            return ok(session("userId"));
        }

        return ok(sb.toString());
        
        //return ok(index.render("Your new application is ready1."));            
    }

    public static Result resource(String filePath) {
        //Logger.info("File Path: " + filePath);
        
        String appId = session("appId");
        
        if (appId == null || appId.compareTo(Messages.get("appId")) != 0) {
            session().clear();
            session("appId", "7248d7fc-1fab-45a6-87fe-5b57e03ac425");            
        }
        
        
        String physicalPath = "public" + File.separator;
        if (filePath.length() > 5) {
            if (filePath.substring(filePath.length() - 5, filePath.length()).compareToIgnoreCase(".html") != 0) {
                File file = new File(physicalPath + filePath);
                if (file.exists()) {
                    return ok(file);                    
                }
                else {
                    return status(404);
                }
            }
        }
        
        /* for PC login only */
        DynamicForm form = Form.form().bindFromRequest();
        
        String userId = form.get("userId");
        if (userId != null) {
            session("userId", userId);
        }
        
        userId = session("userId");
        //Logger.info("userId from Taurus: " + userId);
        
        if (null == userId || userId.isEmpty()) {
            session("profile", "true");
            return verify(filePath);
        }        
       
        FileReader fis;
        try {
            fis = new FileReader(physicalPath + filePath);

            BufferedReader reader = new BufferedReader(fis);
            String data = null;
            StringBuilder builder = new StringBuilder();
        
            while ((data = reader.readLine()) != null) {
                builder.append(data);
            }
            
            reader.close();
            fis.close();
            return ok(index.render(builder.toString()));                
            
        } catch (Throwable e) {
          // TODO Auto-generated catch block
            //Logger.info("Exception: " + e.getMessage());
            return status(404);
        }        
    }
    
    private static Result verify(String filePath) {
        DynamicForm form = Form.form().bindFromRequest();
        String convertedFilePath = Messages.get("domain") + filePath;
        Map<String, String> params = form.data();
        convertedFilePath += "?";
        for (Entry<String, String> entry : params.entrySet()) {
            convertedFilePath += entry.getKey();
            convertedFilePath += "=";
            convertedFilePath += entry.getValue();
            convertedFilePath += "&";
        }
        
        convertedFilePath = convertedFilePath.substring(0, convertedFilePath.length()-1);
        
        convertedFilePath = convertedFilePath.replace("/", "%2F");
        convertedFilePath = convertedFilePath.replace("?", "&");
        convertedFilePath = convertedFilePath.replace(":", "%3A");
        
        //Logger.info("Verify: " + Messages.get("server") + Messages.get("server.verify")+ convertedFilePath);
        return redirect(Messages.get("server") +Messages.get("server.verify")+ convertedFilePath);        
    }
    
}
