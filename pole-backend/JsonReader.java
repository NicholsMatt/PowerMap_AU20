import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;

import org.json.simple.JSONObject;

import jdk.nashorn.internal.parser.JSONParser;

//Map containing all the pole ids and longitude latititude cordinates
Map<int,double,double> cords = new Map<>();

public class JsonReader {
   public static void main(String args[]) {

      //Creating a JSONParser object
      JSONParser jsonParser = new JSONParser();
      try {
         //Parsing the contents of the JSON file
         JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("j.json"));
         //Forming URL
         double width = (double) jsonObject.get("width");
         double height = (double) jsonObject.get("height");
         double heading = (double) jsonObject.get("heading");
         String url = jsonObject.get("umageUrl");
         double azimuth = (double) jsonObject.get("azimuth");
         double fov = (double) jsonObject.get("FOV");
         double yaw = (double) jsonObject.get("yaw");
         String type = jsonObject.get("Type");
         int transformers = (int) jsonObject.get("transformers");
         int crossarm = (int) jsonObject.get("crossarm");
         double lat = (double) jsonObject.get("latitude");
         double lon = (double) jsonObject.get("longitude");
         JSONArray jsonArray = (JSONArray) jsonObject.get("coordinates");
         double c1 = jsonArray[0];
         double c2 = jsonArray[1];
         
         int id = 10000;

         while(cords.containsKey(id)){
             id++;
         }

         cords.put(id,lat,lon);

      } catch (FileNotFoundException e) {
         e.printStackTrace();
      } catch (IOException e) {
            e.printStackTrace();
      } catch (ParseException e) {
            e.printStackTrace();
      }
   }
}
