package utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

import model.CustomFile;

public class Utils implements Callable {

	@SuppressWarnings("unchecked")
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, ArrayList<CustomFile>> files = new HashMap<>();
		
		for (HashMap<String, ?> file_entry : (List<HashMap<String, ?>>) ((HashMap<String, ?>) eventContext.getMessage().getInvocationProperty("input")).get("sip_package")) {
			CustomFile file = new CustomFile();

			file.file_name = file_entry.get("file_name").toString();
			file.file_path = file_entry.get("file_path").toString();
			file.file_type = file_entry.get("file_type").toString();
			file.md5 = file_entry.get("md5") == null ? null : file_entry.get("md5").toString();
			file.timestamp = DateTime.now(); // DateTime.parse(file_entry.get("timestamp").toString());
			
			ArrayList<CustomFile> newVal = new ArrayList<CustomFile>();
			newVal.add(file);
			
			if (files.get(file.file_type) != null) {
				ArrayList<CustomFile> oldVal = (ArrayList<CustomFile>) files.get(file.file_type);
				newVal.addAll(oldVal);
			}

			files.put(file.file_type, newVal);			
		}

		return files;
	}

}
