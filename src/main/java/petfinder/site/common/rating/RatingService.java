package petfinder.site.common.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {
    @Autowired
    private RatingDao ratingDao;
    @Autowired
    private UserDao userDao;

    /**
     * find by id
     * @param id
     * @return
     */
    public Optional<RatingDto> findRating(String id) {
        return ratingDao.findRating(id);
    }

    /**
     * storing the rating
     * @param rating
     * @return
     */
    public RatingDto save(RatingDto rating) {
        UserDto sitter = userDao.findUserByPrincipal(rating.getSitterPrinciple()).get().getUser();
        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(sitter.getPrincipal());
        ownerNoti.setInfo("Some one wrote a rating for you ");
        ratingDao.save(rating);
        return rating;
    }

    /**
     * find all by users
     * @param principal
     * @return
     */
    public List<RatingDto> findRatingByUserID(String principal) {
        List<RatingDto> res = ratingDao.findRatingByPrinciple(principal);
        return res;
    }
}
