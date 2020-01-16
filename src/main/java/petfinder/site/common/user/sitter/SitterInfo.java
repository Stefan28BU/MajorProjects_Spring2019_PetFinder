package petfinder.site.common.user.sitter;

import petfinder.site.common.user.UserDto;

/**
 * contains a user info and the availablity for frontend
 */
public class SitterInfo {
    private UserDto userDto;
    private SitterAvailabilityDto sitterAvailabilityDto;
    public SitterInfo() {

    }

    public SitterInfo(UserDto userDto, SitterAvailabilityDto sitterAvailabilityDto) {
        this.userDto = userDto;
        this.sitterAvailabilityDto = sitterAvailabilityDto;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public SitterAvailabilityDto getSitterAvailabilityDto() {
        return sitterAvailabilityDto;
    }

    public void setSitterAvailabilityDto(SitterAvailabilityDto sitterAvailabilityDto) {
        this.sitterAvailabilityDto = sitterAvailabilityDto;
    }
}
