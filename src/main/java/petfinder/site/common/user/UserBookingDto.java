package petfinder.site.common.user;

import alloy.util.Identifiable;

import java.util.UUID;

public class UserBookingDto implements Identifiable {
    private Long id;
    private String userPrincipal;
    private String bookingId;

    public UserBookingDto() {
        id = UUID.randomUUID().getMostSignificantBits();
    }

    public UserBookingDto(String userPrincipal, String bookingId) {
        id = UUID.randomUUID().getMostSignificantBits();
        this.userPrincipal = userPrincipal;
        this.bookingId = bookingId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserPrincipal() {
        return userPrincipal;
    }

    public void setUserPrincipal(String userPrincipal) {
        this.userPrincipal = userPrincipal;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }
}
