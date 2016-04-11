package answer;

public class FXPResponse{

	
	private String id;
	private String actie;
	private String status;
	private String message;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getActie() {
		return actie;
	}
	public void setActie(String actie) {
		this.actie = actie;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String toString() {
		return String.format("id: %s\tactie: %s\tstatus: %s\tmessage: %s", id, actie, status, message);
	}
}
