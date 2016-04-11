package utils;

import javax.xml.validation.Validator;

import org.apache.log4j.Logger;
import org.mule.module.xml.filters.SchemaValidationFilter;
import org.xml.sax.SAXException;

public class MySchemaValidationFilter extends SchemaValidationFilter
{
  static Logger logger = Logger.getLogger(MySchemaValidationFilter.class);
 
  public Validator createValidator() throws SAXException
  {
    Validator validator = super.createValidator();
    validator.setErrorHandler(getErrorHandler());
    return validator;
  }
}
