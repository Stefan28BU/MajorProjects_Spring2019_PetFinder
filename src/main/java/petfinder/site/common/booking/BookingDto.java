package petfinder.site.common.booking;

import alloy.util.Momento;
import petfinder.site.common.user.UserDto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * booking is a element, it relates the owner and the sitter
 */
public class BookingDto implements Momento<String> {

    private String id;

    public List<UserDto> getInvitedSitter() {
        return invitedSitter;
    }

    public void addInvitedSitter(UserDto sitter) {
        invitedSitter.add(sitter);
    }

    public void setInvitedSitter(List<UserDto> invitedSitter) {
        this.invitedSitter = invitedSitter;
    }

    private String title;
    private String owner;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    private String sitter;
    private String petId;
    private String time;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String locationName;
    private Double lat;
    private Double lng;
    private Date createDate;
    private List<UserDto> invitedSitter;

    public Double getLat() {
        if (this.lat == null){
            return 45.0;
        }
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        if (lng == null){
            return 45.0;
        }
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public List<String> getWaitingSitter() {
        return waitingSitter;
    }

    public void setWaitingSitter(List<String> waitingSitter) {
        this.waitingSitter = waitingSitter;
    }

    public void addSitter(String principle) {
        waitingSitter.add(principle);
    }

    private List<String> waitingSitter;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    private BookingStatus status;

    public void signUp() {
        status = BookingStatus.SIGNED;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public enum BookingStatus {
        UNSIGNED, SIGNED, STARTED, FINISHED
    }
    public BookingDto() {
        // Randomly generate an id when constructing a pet object.
        this.id = UUID.randomUUID().toString();
        this.status = BookingStatus.UNSIGNED;
        this.createDate = new Date();
    }

    public String getId() {
        return id;
    }

    public BookingDto(String owner, String sitter, String petId, String time, String description) {
        this.owner = owner;
        this.sitter = sitter;
        this.petId = petId;
        this.time = time;
        this.description = description;
        this.status = BookingStatus.UNSIGNED;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getSitter() {
        return sitter;
    }

    public void setSitter(String sitter) {
        this.sitter = sitter;
    }

    public String getPetId() {
        return petId;
    }

    public void setPetId(String petId) {
        this.petId = petId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String description;
    @Override
    public String getMomento() {
        return id;
    }

}
