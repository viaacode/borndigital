package be.viaa.transformers;

import java.io.InputStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.input.BOMInputStream;
import org.mule.api.MuleMessage;
import org.mule.api.transformer.TransformerException;
import org.mule.transformer.AbstractMessageTransformer;
/**
 * 
 * @author https://stackoverflow.com/users/1864381/countd
 * Taken from answer on https://stackoverflow.com/questions/20249167/mule-flow-how-remove-bom-marker-from-xml-file
 *
 */
public class DeleteBOMTransformer extends AbstractMessageTransformer {
	@Override
	public Object transformMessage(MuleMessage message, String outputEncoding) throws TransformerException {
		try (InputStream in = new BOMInputStream(IOUtils.toInputStream(message.getPayloadAsString()))) {
			return in;
		} catch (Exception e) {
			throw new RuntimeException("Could not remove BOM marker");
		}
	}
}
