package utils;

import java.io.StringWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import srt.Fragment;
import srt.FragmentCollection;
import srt.Timestamp;

import com.sun.xml.bind.marshaller.DataWriter;

public class SrtService {

	public String TransformSrt(String srt) {
		String regex = "([0-9]+)[\\r\\n]*([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}) --> ([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3})[\\r\\n]*(.*[\\r]?[\\n]?[\\r]?.*)";
        Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
        
        Matcher matcher = pattern.matcher(srt);
        FragmentCollection collection = new FragmentCollection(25.0);
        if (matcher != null) {
            while (matcher.find()) {
                System.out.println("\n");

                Fragment fragment = new Fragment(
                        Integer.parseInt(matcher.group(1)),
                        Timestamp.parse(matcher.group(2)),
                        Timestamp.parse(matcher.group(3)),
                        matcher.group(4).replace("\n", " ").replace("<", "").replace(">", "").replace("/", "").replace("\r", ""));

                collection.addFragment(fragment);

            }
        }
        
        try {
            JAXBContext context = JAXBContext.newInstance(FragmentCollection.class);
            Marshaller jaxbMarshaller = context.createMarshaller();
            jaxbMarshaller.setProperty(Marshaller.JAXB_FRAGMENT, true);
            
            
            StringWriter printWriter = new StringWriter();
            DataWriter dataWriter = new DataWriter(printWriter, "Unicode");
            jaxbMarshaller.marshal(collection, dataWriter);
            return printWriter.toString(); //.replace("<?xml version=\"1.0\" encoding=\"Unicode\" standalone=\"yes\"?>", "");
            
			//return asString(context, collection);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
        
		return "";
		
		    
        //return sw.toString();
        //return collection.getFragment();
	}
	
	public String asString(
            JAXBContext pContext, 
            Object pObject)
                throws 
                    JAXBException {

java.io.StringWriter sw = new StringWriter();

Marshaller marshaller = pContext.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
marshaller.marshal(pObject, sw);

return sw.toString();
}

}
