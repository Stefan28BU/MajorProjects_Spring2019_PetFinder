package petfinder.site.common.rating;

import alloy.util.Momento;

import java.util.UUID;

public class RatingDto implements Momento<String> {
    private String id;
    private String sitterPrinciple;
    private String bookingId;
    private String content;
    private String rating;

    public RatingDto() {
        this.id = UUID.randomUUID().toString();
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSitterPrinciple() {
        return sitterPrinciple;
    }

    public void setSitterPrinciple(String sitterPrinciple) {
        this.sitterPrinciple = sitterPrinciple;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRating() {
        return rating;
    }

    public RatingDto(String id, String sitterPrinciple, String bookingId, String content, String rating) {
        this.id = id;
        this.sitterPrinciple = sitterPrinciple;
        this.bookingId = bookingId;
        this.content = content;
        this.rating = rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    @Override
    public String getMomento() {
        return id;
    }
}
