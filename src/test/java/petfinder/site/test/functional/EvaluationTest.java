package petfinder.site.test.functional;
import org.junit.jupiter.api.Test;
import petfinder.site.common.booking.BookingService;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class EvaluationTest {
    BookingService bookingService = new BookingService();

    @Test
    void evaluateSuccess() throws Exception{
        String one1 = "2019-03-29T20:54:22.000Z";
        String one2 = "2019-03-28T20:54:22.000Z";
        String one3 = "2019-02-28T20:54:22.000Z";
        String one4 = "2019-05-27T20:54:22.000Z";
        String one5 = "2019-03-28T20:54:22.000Z";
        String one6 = "2019-03-28T20:54:22.000Z";
        String one7 = "2019-03-28T20:54:22.000Z";
        String one8 = "2019-03-28T20:54:22.000Z";
        Date bookingStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(one1.substring(0, 10));
        Date bookingEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(one2.substring(0, 10));
        Date sitterStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(one3.substring(0, 10));
        Date sitterEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(one4.substring(0, 10));
        assertTrue(bookingService.evaluate(one1, one2,one3,one4,one5,one6,one7,one8) == 1);
    }

    @Test
    void evaluateFail() throws Exception{
        String one1 = "2019-01-29T20:54:22.000Z";
        String one2 = "2019-08-28T20:54:22.000Z";
        String one3 = "2019-02-28T20:54:22.000Z";
        String one4 = "2019-05-27T20:54:22.000Z";
        String one5 = "2019-03-28T20:54:22.000Z";
        String one6 = "2019-03-28T20:54:22.000Z";
        String one7 = "2019-03-28T20:54:22.000Z";
        String one8 = "2019-03-28T20:54:22.000Z";
        Date bookingStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(one1.substring(0, 10));
        Date bookingEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(one2.substring(0, 10));
        Date sitterStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(one3.substring(0, 10));
        Date sitterEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(one4.substring(0, 10));
        assertTrue(bookingService.evaluate(one1, one2,one3,one4,one5,one6,one7,one8) == 0);
    }

}
