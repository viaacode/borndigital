package srt;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * Created by dieter on 08/09/15.
 */
public class Fragment {
    @XmlElement(required = true)
    public String title;
    @XmlElement(required = true)
    public String description;
    @XmlTransient
    public int number;
    @XmlTransient
    public Timestamp startTime;
    @XmlTransient
    public Timestamp endTime;
    public long original_start_z;
    public long original_end_z;
    @XmlElement(required=true)
    public List<String> keywords;


    public Fragment(int number, Timestamp startTime, Timestamp endTime, String title) {
        this.title = title;
        this.number = number;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = "";
        keywords = new ArrayList<String>();
    }
    
    public Fragment() {
    	
    }

    public List<String> getKeywords() {
        return keywords;
    }
}
