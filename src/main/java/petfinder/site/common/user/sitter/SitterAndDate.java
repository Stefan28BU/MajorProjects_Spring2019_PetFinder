package petfinder.site.common.user.sitter;

import petfinder.site.common.user.UserDto;

/**
 * for displaying the sitters in different recommendation
 */
public class SitterAndDate {
    private SitterAvailabilityDto availability;
    private UserDto sitter;
    private Double distance;

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public SitterAndDate() {
    }

    public SitterAndDate(SitterAvailabilityDto availability, UserDto sitter, Double distance) {
        this.availability = availability;
        this.sitter = sitter;
        this.distance = distance;
    }

    public SitterAvailabilityDto getAvailability() {
        return availability;
    }

    public void setAvailability(SitterAvailabilityDto availability) {
        this.availability = availability;
    }

    public UserDto getSitter() {
        return sitter;
    }

    public void setSitter(UserDto sitter) {
        this.sitter = sitter;
    }
}
