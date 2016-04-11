package srt;

/**
 * Created by dieter on 08/09/15.
 */
public class FrameCalculator {
    public static long getFrameForTime(Timestamp time, double framerate) {
        long frameCount = 0;
        if (time.hours > 0) {
            frameCount += (time.hours * 3600 * framerate);
        }
        if (time.minutes > 0) {
            frameCount += (time.minutes * 60 * framerate);
        }
        if (time.seconds > 0) {
            frameCount += (time.seconds * framerate);
        }
        if (time.milliseconds > 0) {
            frameCount += (time.milliseconds / (((double) (1.0 / framerate)) * 1000));
        }
        return frameCount;
    }
}
