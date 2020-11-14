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

         JSONObject jsonObject1 = (JSONObject) jsonObject.get("image");
         double width = (double) jsonObject1.get("width");
         double height = (double) jsonObject1.get("height");
         double heading = (double) jsonObject1.get("heading");
         double lat = (double) jsonObject1.get("latitude");
         double lon = (double) jsonObject1.get("longitude");
         String url = jsonObject1.get("umageUrl");
         double azimuth = (double) jsonObject1.get("azimuth");
         double fov = (double) jsonObject1.get("FOV");
         double yaw = (double) jsonObject1.get("yaw");
         String type = jsonObject1.get("Type");

         JSONObject jsonObject2 = (JSONObject) jsonObject.get("Esri Data");
         int transformers = (int) jsonObject2.get("transformers");
         int crossarm = (int) jsonObject2.get("crossarm");
         
         JSONObject jsonObject3 = (JSONObject) jsonObject.get("pole");
         JSONArray jsonArray = (JSONArray) jsonObject3.get("coordinates");
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
