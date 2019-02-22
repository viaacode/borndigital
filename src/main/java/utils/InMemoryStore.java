package utils;

import java.util.HashMap;
import java.util.Map;

public class InMemoryStore {
	
	private Map<String, Object> data;
	
	public InMemoryStore() {
		data = new HashMap<String, Object>();
	}
	
	public Object get(String key) {
		return data.get(key);
	}
	
	public Object put(String key, Object value) {
		data.put(key, value);
		return value;
	}
	
	public boolean contains(String key) {
		return data.containsKey(key);
	}
	
	public Map<String, Object> list() {
		return data;
	}
	
	
}