package utils;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

public class MyErrorHandler implements ErrorHandler {
	 
    static Logger logger = Logger.getLogger(MyErrorHandler.class);
 
    public List<String> getErrors() {
        return errors;
    }
    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
    private List<String> errors = new ArrayList<String>();
    @Override
    public void warning(SAXParseException e) throws SAXException {
        logger.warn(e.getLineNumber() + "/" + e.getColumnNumber() + ": " + e.getMessage());
    }
    @Override
    public void fatalError(SAXParseException e) throws SAXException {
        logger.debug("fatalError occurred: " + e.toString());
        errors.add(e.getLineNumber() +"/" + e.getColumnNumber() + ": " + e.getMessage());
    }
    @Override
    public void error(SAXParseException e) throws SAXException {
        logger.debug("error occurred: " + e.toString());
        errors.add(e.getLineNumber() +"/" + e.getColumnNumber() + ": " + e.getMessage());
    }
}
