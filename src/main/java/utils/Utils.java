package utils;

import java.util.Map;

import model.CustomFile;
import model.Input;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

public class Utils implements Callable {
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, CustomFile> files = ((Input) eventContext.getMessage().getInvocationProperty("input")).getAllFiles();
		return files;
	}
}
