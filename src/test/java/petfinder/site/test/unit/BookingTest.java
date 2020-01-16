package petfinder.site.test.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;

import static org.junit.jupiter.api.Assertions.*;


public class BookingTest {

    BookingDto bookingDto = null;

    @BeforeEach
    void init() {
        this.bookingDto = new BookingDto();
    }

    @Test
    void testId() {
        BookingDto bookingDto1 = new BookingDto();
        BookingDto bookingDto2 = new BookingDto();
        assertNotEquals(bookingDto1.getId(), bookingDto2.getId());
    }

    @Test
    void testSignUp() {
        BookingDto bookingDto = new BookingDto();
        bookingDto.signUp();
        assertEquals(BookingDto.BookingStatus.SIGNED, bookingDto.getStatus());
    }

    @Test
    void testNullLat() {
        BookingDto bookingDto = new BookingDto();
        assertEquals((double)bookingDto.getLat(), 45.0);
        assertEquals((double)bookingDto.getLng(), 45.0);
    }
}
