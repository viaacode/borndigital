package utils;

import org.mule.api.MuleMessage;
import org.mule.api.transformer.TransformerException;
import org.mule.transformer.AbstractMessageTransformer;
import org.unbescape.html.HtmlEscape;

public class UnescapeHtml extends AbstractMessageTransformer {

	@Override
	public Object transformMessage(MuleMessage message, String outputEncoding)
			throws TransformerException {
		String transcriptieWithEscapes = message.getInvocationProperty("transcriptie");		
		
		String transcriptieWithoutEscapes = HtmlEscape.unescapeHtml(transcriptieWithEscapes);		
		
		return transcriptieWithoutEscapes;
	}
}
