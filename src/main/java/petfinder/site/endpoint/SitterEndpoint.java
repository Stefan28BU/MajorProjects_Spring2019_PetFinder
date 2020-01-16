package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.sitter.SitterAndDate;
import petfinder.site.common.user.sitter.SitterAvailabilityDto;
import petfinder.site.common.user.sitter.SitterInfo;
import petfinder.site.common.user.sitter.SitterService;

import javax.xml.crypto.dsig.SignedInfo;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sitters")
public class SitterEndpoint {

    @Autowired
    private SitterService sitterService;
    private SitterAvailabilityDto sitterAvailabilityDto;

    // Take an id, and look up the corresponding pet

    /**
     * this endpoint returns a sitter user's availability
     * @param id
     * @return availability time range and location
     */
    @GetMapping(value = "/{id:.+}", produces = "application/json")
    public SitterAvailabilityDto getAvailability(@PathVariable("id") String id) {
        System.out.println(id);
        return sitterService.findAvailability(id);
    }

    /**
     * return the user profile of a sitter
     * @param id
     * @return
     */
    @GetMapping(value = "/info{id:.+}", produces = "application/json")
    public UserDto getInfo(@PathVariable("id") String id) {
        System.out.println(id);
        return sitterService.findUserInfo(id);
    }

    /**
     * return the signed booking of a sitter
     * @return booking list
     */
    @GetMapping(value = "/sitterBookings", produces = "application/json")
    public List<BookingDto> sitterBookings() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return sitterService.sitterBookings(principal);
    }
    // Take a JSON representation of a Pet and save it to Elasticsearch

    /**
     * create / update an availabilityDto
     * @param sitterAvailabilityDto
     * @return
     */
    @PostMapping(value = "")
    public SitterAvailabilityDto saveAvailability(@RequestBody SitterAvailabilityDto sitterAvailabilityDto) {
        System.out.println(sitterAvailabilityDto.getPrincipal());
        System.out.println(sitterAvailabilityDto.getAvailability());
        sitterService.update(sitterAvailabilityDto);
        return sitterAvailabilityDto;
    }

    /**
     * create / update an availabilityDto
     * @param sitterAvailabilityDto
     * @return
     */
    @PostMapping(value = "/edit_availability")
    public SitterAvailabilityDto editProfile(@RequestBody SitterAvailabilityDto sitterAvailabilityDto) {
        System.out.println("updating" + sitterAvailabilityDto.getPrincipal());
        return sitterService.update(sitterAvailabilityDto);
    }

    /**
     * return the availability of a specified sitter
     * @param id
     * @return
     */
    @GetMapping(value = "/available{id}", produces = "application/json")
    public List<SitterAndDate> getAvailableSitter(@PathVariable("id") String id) {
        return sitterService.getSitters(id);
    }

    /**
     * return the sitters sorted by distance with a booking
     * @param id
     * @return
     */
    @GetMapping(value = "/availableA{id}", produces = "application/json")
    public List<SitterAndDate> getAvailableSitterAddress(@PathVariable("id") String id) {
        return sitterService.sortByDistance(sitterService.getSitters(id));
    }

    /**
     * return the sitters sorted by rating with a booking
     * @param id
     * @return
     */
    @GetMapping(value = "/availableR{id}", produces = "application/json")
    public List<SitterAndDate> getAvailableSitterRating(@PathVariable("id") String id) {
        return sitterService.sortByRating(sitterService.getSitters(id));
    }

    /**
     * return invitations of booking of a sitter
     * @param
     * @return
     */
    @GetMapping(value = "/invitations", produces = "application/json")
    public List<BookingDto> getInvitations() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return sitterService.getInvitations(principal);
    }

    /**
     * return all sitters
     * @return user info and a availability
     */
    @GetMapping(value = "/allSitter", produces = "application/json")
    public List<SitterInfo> getAllSitters() {
        return sitterService.getAllSitters();
    }


}
