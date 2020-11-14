/**
 * This reade a json file and pulls out all relevant info and stores into a json object
 * This json object can then be used to pull latitudes and longitudes easily as they are nodes
 */

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class JSONWriteExample 
{ 
	public static void main(String[] args) throws FileNotFoundException 
	{ 
		//Create JSON
		JSONObject jo = new JSONObject(); 

/**
All these numbers are from one of the json given to us. We can replace these with numbers we read 
*/
		Map m = new LinkedHashMap(10); 
			m.put("width", 3000); 
			m.put("height", 4000); 
			m.put("heading", 3.4146); 
			m.put("latitude", 39.9778982); 
			m.put("longitude", -83.0452891); 
			m.put("imageUrl", "URL"); 
			m.put("azimuth", 338.5502666666667); 
			m.put("FOV", 58); 
			m.put("yaw", 55); 
			m.put("Type", "pole"); 
			
			// putting into JSONObject 
			jo.put("image", m); 
	
			Map m1 = new LinkedHashMap(1); 
			Map m2 = new LinkedHashMap(2);
			m2.put("transformers", 0); 
			m2.put("crossarm", 1); 
			m1.put("assets",m2);
	
			// putting into JSONObject 
			m.put("Esri Data",m1); 
		
		// writing JSON to file:"JSONExample.json" in cwd 
		PrintWriter pw = new PrintWriter("JSONExample.json"); 
		pw.write(jo.toJSONString()); 
		
		pw.flush(); 
		pw.close(); 
	} 
}
