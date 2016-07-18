package model;

import java.util.HashMap;
import java.util.Map;

import org.joda.time.DateTime;

public class Input {
	public String cp_name;
	public String flow_id;
	public CustomFile[] sip_package;
	public String username;
	public String password;
	public String server;
	public String timestamp;
	
	public Map<String, CustomFile> getAllFiles() {
		Map<String, CustomFile> files = new HashMap<String, CustomFile>();
		for (CustomFile file : sip_package) {
			files.put(file.file_type, file);
		}
		return files;
	}
}