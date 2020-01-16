package petfinder.site.test.functional;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.sitter.SitterService;

import static org.junit.jupiter.api.Assertions.*;

import java.text.SimpleDateFormat;
import java.util.Date;
public class DistanceTest {
    SitterService sitterService = new SitterService();

    @Test
    void testWacoToDallas() {
        Double tem = sitterService.calculateDistance(31.5493, 31.5561122, -97.111544, -97.12456);
        assertEquals(0.8993603809636121, (double)tem);
        System.out.println(tem);
    }

    @Test
    void testWacoToDallasReverse() {
        Double tem = sitterService.calculateDistance(  31.5561122,31.5493,  -97.12456, -97.111544);
        assertEquals(0.8993603809636121, (double)tem);
        System.out.println(tem);
    }

    @Test
    void testSameLoc() {
        Double tem = sitterService.calculateDistance(45, 45, 45, 45);
        assertEquals(0, (double)tem);
        System.out.println(tem);
    }

    @Test
    void testSameLocZero() {
        Double tem = sitterService.calculateDistance(0,0,0,0);
        assertEquals(0, (double)tem);
        System.out.println(tem);
    }

}
