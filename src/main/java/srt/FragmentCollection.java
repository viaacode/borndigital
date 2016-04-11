package srt;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dieter on 08/09/15.
 */
@XmlRootElement(name="fragments")
public class FragmentCollection {
    @XmlElement(name="fragment")
    private List<Fragment> fragment;
    @XmlTransient
    int offset;
    @XmlTransient
    double framerate;

    public FragmentCollection(double framerate) {
        fragment = new ArrayList<Fragment>();
        this.framerate = framerate;
    }

    public FragmentCollection() {
    }


    public List<Fragment> getFragment() {
        return fragment;
    }

    public void addFragment(Fragment fragment) {
        if (this.fragment.size() == 0) {
            //Set offset
            offset = fragment.startTime.hours;
        }
        fragment.startTime.hours -= offset;
        fragment.endTime.hours -= offset;

        fragment.original_start_z = FrameCalculator.getFrameForTime(fragment.startTime, framerate);
        fragment.original_end_z = FrameCalculator.getFrameForTime(fragment.endTime, framerate);

        this.fragment.add(fragment);
    }
}
