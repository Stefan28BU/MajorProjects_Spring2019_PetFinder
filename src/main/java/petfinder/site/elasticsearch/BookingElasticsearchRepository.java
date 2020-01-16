package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.booking.BookingDto;

@Service
public class BookingElasticsearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<BookingDto, String> {
    public BookingElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-booking"), BookingDto.class);
    }
}
