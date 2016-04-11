package utils;

import model.CustomFile;
import model.FXPRequest;

public class RequestTransformer {

	
	public FXPRequest Transform(Object payload, String pid, String ftpDestinationPath, String cp_name) {
		CustomFile file = (CustomFile) payload;
		String[] splitted = file.file_name.split("\\.");
		String filename = splitted[0];
		String extension;
		if (splitted.length > 2) {
			extension = splitted[1] + "." + splitted[2];
		} else {
			extension = splitted[1];
		}
		
		
				
		
		FXPRequest request = new FXPRequest(
				file.file_path,
				file.file_name,
				ftpDestinationPath + cp_name + "/",
				pid + "." + extension);
		
		return request;
	}
	

}
