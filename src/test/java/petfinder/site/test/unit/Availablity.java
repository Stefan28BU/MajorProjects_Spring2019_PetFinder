package petfinder.site.test.unit;

import alloy.util._Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.sitter.SitterAvailabilityDto;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Availablity {
    private SitterAvailabilityDto sitterAvailabilityDto = null;
    @BeforeEach
    void init() {
        sitterAvailabilityDto = new SitterAvailabilityDto();
    }

    @Test
    void testType() {
        SitterAvailabilityDto s1 = new SitterAvailabilityDto();
        assertEquals((double)s1.getLat(), 45.0);
        assertEquals((double)s1.getLng(), 45.0);

    }


}
