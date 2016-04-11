package model;

public class FXPRequest {
	public String sourcePath;
	public String sourceFile;
	public String destinationPath;
	public String destinationFile;
	
	public FXPRequest(String sourcePath, String sourceFile,
			String destinationPath, String destinationFile) {
		super();
		this.sourcePath = sourcePath;
		this.sourceFile = sourceFile;
		this.destinationPath = destinationPath;
		this.destinationFile = destinationFile;
	}
}
