package srt;

/**
 * Created by dieter on 08/09/15.
 */
public class Timestamp {
    public int hours;
    public int minutes;
    public int seconds;
    public int milliseconds;
    public int offset;

    public Timestamp(int hours, int minutes, int seconds, int milliseconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }

    public static Timestamp parse(String s) {
        return new Timestamp(
                Integer.parseInt(s.substring(0, 2)),
                Integer.parseInt(s.substring(3, 5)),
                Integer.parseInt(s.substring(6, 8)),
                Integer.parseInt(s.substring(9, 12)));
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }

    public int getMilliseconds() {
        return milliseconds;
    }

    public void setMilliseconds(int milliseconds) {
        this.milliseconds = milliseconds;
    }

    @Override
    public String toString() {
        return "Timestamp{" +
                "hours=" + hours +
                ", minutes=" + minutes +
                ", seconds=" + seconds +
                ", milliseconds=" + milliseconds +
                '}';
    }
}
