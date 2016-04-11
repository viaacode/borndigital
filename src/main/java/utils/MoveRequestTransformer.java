package utils;

import model.CustomFile;
import model.MoveRequest;

public class MoveRequestTransformer {
	public MoveRequest Transform(Object payload, String ftpDestinationPath, String cp_name, String failuresFolder, String host, String user, String password) {
		System.out.println("In Transform method");
		CustomFile file = (CustomFile) payload;
		String[] splitted = file.file_name.split("\\.");
		String filename = splitted[0];
		String extension;
		if (splitted.length > 2) {
			extension = splitted[1] + "." + splitted[2];
		} else {
			extension = splitted[1];
		}
		
		
				
		
		MoveRequest request = new MoveRequest();
		request.setSourcePath(file.file_path + "/");
		request.setSourceFile(file.file_name);
		request.setDestinationPath(failuresFolder + "/");
		request.setDestinationFile(file.file_name);
		request.setHost(host);
		request.setUser(user);
		request.setPassword(password);
		
		
		return request;
	}
}
