package petfinder.site.common.booking;

public class ApproveRequest {
    private String principal;
    private String bookingId;

    public ApproveRequest() {
    }

    public ApproveRequest(String principal, String bookingId) {
        this.principal = principal;
        this.bookingId = bookingId;
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }
}
