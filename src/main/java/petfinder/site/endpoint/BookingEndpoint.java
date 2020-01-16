package petfinder.site.endpoint;


import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.booking.ApproveRequest;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.user.UserDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingEndpoint {
    @Autowired
    private BookingService bookingService;

    /**
     * get booking by booking id
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}", produces = "application/json")
    public BookingDto getBooking(@PathVariable("id") String id) {
        Optional<BookingDto> temp = bookingService.findBooking(id);
        if (temp.isPresent()) {
            return bookingService.processDate(temp.get());
        }
        return null;
    }

    /**
     * find recommend booking
     * @param id
     * @return
     */
    @GetMapping(value = "/recommend{id}", produces = "application/json")
    public Map<UserDto, Integer> getRecommend(@PathVariable("id") String id) {
        return bookingService.findRecommend(id);
    }

    /**
     * find unsigned booking
     * @return
     */
    @GetMapping(value = "/openingBooking")
    public List<BookingDto> getOpenBooking() {
        return bookingService.findOpenBooking();
    }

    /**
     * find started booking
     * @return
     */
    @GetMapping(value = "/getStartingBooking")
    public boolean getStartingBooking() {
        bookingService.checkApproachingBooking();
        return true;
    }

    /**
     * store a booking
     * @param booking
     * @return
     */
    @PostMapping(value = "")
    public BookingDto saveBooking(@RequestBody BookingDto booking) {
        bookingService.save(booking);
        return booking;
    }

    /**
     * for a sitter to apply a booking
     * @param booking
     * @return
     */
    @PostMapping(value = "/signUp")
    public BookingDto signUp(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.signUp(booking.getId());
        return booking;
    }

    /**
     * for a owner to approve a application
     * @param booking
     * @return
     */
    @PostMapping(value = "/confirm")
    public BookingDto confirm(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.confrim(booking.getId());
        return booking;
    }

    /**
     * sitter can cancel a booking sitter signed up
     * @param booking
     * @return
     */
    @PostMapping(value = "/sitterCancel")
    public BookingDto sitterCancel(@RequestBody BookingDto booking) {
        System.out.println("canceling+" + booking.getId());
        bookingService.sitterCancel(booking.getId());
        return booking;
    }

    /**
     * delete a booking
     * @param booking
     * @return
     */
    @PostMapping(value = "/delete")
    public BookingDto cancelBooking(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.deleteBooking(booking);
        return booking;
    }

    /**
     * owner make the sitter to be in booking
     * @param approveRequest
     * @return
     */
    @PostMapping(value = "/approve")
    public BookingDto approveBooking(@RequestBody ApproveRequest approveRequest) {
        System.out.println("approving+" + approveRequest.getBookingId());
        Optional<BookingDto> temp = bookingService.findBooking(approveRequest.getBookingId());
        if (temp.isPresent()) {
            bookingService.approve(approveRequest.getBookingId(), approveRequest.getPrincipal());
        }
        return temp.get();
    }

    /**
     * owner invite a sitter for a booking
     * @param approveRequest
     * @return
     */
    @PostMapping(value = "/invite")
    public BookingDto inviteSitter(@RequestBody ApproveRequest approveRequest) {
        System.out.println("inviting+" + approveRequest.getBookingId());
        Optional<BookingDto> temp = bookingService.findBooking(approveRequest.getBookingId());
        if (temp.isPresent()) {
            bookingService.invite(approveRequest.getBookingId(), approveRequest.getPrincipal());
        }
        return temp.get();
    }

    /**
     * owner manually end a booking
     * @param bookingDto
     * @return
     */
    @PostMapping(value = "/finish")
    public BookingDto finishBooking(@RequestBody BookingDto bookingDto) {
        System.out.println("Booking finish");
        return bookingService.finish(bookingDto);
    }




}
