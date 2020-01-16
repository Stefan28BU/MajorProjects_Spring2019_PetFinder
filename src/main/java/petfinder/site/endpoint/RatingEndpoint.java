package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.rating.RatingDto;
import petfinder.site.common.rating.RatingService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rating")
public class RatingEndpoint {
    @Autowired
    private RatingService ratingService;

    /**
     * return return by the auto generated id
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<RatingDto> getRating(@PathVariable("id") String id) {
        return ratingService.findRating(id);
    }

    /**
     * saves the rating to database
     * @param rating
     * @return
     */
    @PostMapping(value = "")
    public RatingDto saveRating(@RequestBody RatingDto rating) {
        ratingService.save(rating);
        return rating;
    }

    /**
     * returns all rating by user principal
     * @return list of rating
     */
    @GetMapping(value = "/rating", produces = "application/json")
    public List<RatingDto> getRagingByUserId() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();

        return ratingService.findRatingByUserID(principal);
    }
}
