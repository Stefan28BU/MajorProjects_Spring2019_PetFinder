package petfinder.site.test.unit;

import org.junit.jupiter.api.Test;
import petfinder.site.common.booking.BookingService;

import java.text.SimpleDateFormat;

import static org.junit.jupiter.api.Assertions.*;

public class DateTest {

    BookingService bookingService = new BookingService();

    @Test
    public void testTrue() {
        assertAll(
                // same exact time
                () -> bookingService.withInOneDay(
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T20:00:00.000Z".substring(0, 10)),
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T20:00:00.000Z".substring(0, 10))
                ),
                // one sec from false
                () -> bookingService.withInOneDay(
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T00:00:00.000Z".substring(0, 10)),
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T23:59:59.000Z".substring(0, 10))
                )
        );
    }

    @Test
    public void testFalse() {
        assertAll(
                // 24 hours later
                () -> assertFalse(bookingService.withInOneDay(
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T00:00:00.000Z".substring(0, 10)),
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-02T00:00:00.000Z".substring(0, 10))
                )),
                // a year later
                () -> assertFalse(bookingService.withInOneDay(
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T00:00:00.000Z".substring(0, 10)),
                        new SimpleDateFormat("yyyy-MM-dd").parse("2020-05-01T00:00:00.000Z".substring(0, 10))
                )),
                // a month later
                () -> assertFalse(bookingService.withInOneDay(
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-05-01T00:00:00.000Z".substring(0, 10)),
                        new SimpleDateFormat("yyyy-MM-dd").parse("2019-06-01T00:00:00.000Z".substring(0, 10))
                ))
        );
    }
}
