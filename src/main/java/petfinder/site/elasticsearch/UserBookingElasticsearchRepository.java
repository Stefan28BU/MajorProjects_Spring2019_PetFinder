package petfinder.site.elasticsearch;


import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.user.UserBookingDto;

@Service
public class UserBookingElasticsearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<UserBookingDto, Long> {
    public UserBookingElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-user-bookings"), UserBookingDto.class);
    }
}
