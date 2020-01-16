package petfinder.site.common.booking;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.BookingElasticsearchRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookingDao {
    @Autowired
    private BookingElasticsearchRepository bookingElasticsearchRepository;

    public Optional<BookingDto> findBooking(String id) {
        return bookingElasticsearchRepository.find(id);
    }

    public void deleteBooking(String id) {
        bookingElasticsearchRepository.delete(id);
    }

    public List<BookingDto> findOpenBooking() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("status=UNSIGNED");
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<BookingDto> bookinsgs = bookingElasticsearchRepository.search(searchSourceBuilder);
        return bookinsgs;
    }

    public List<BookingDto> findNotStartedBooking() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("status=SIGNED");
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<BookingDto> bookinsgs = bookingElasticsearchRepository.search(searchSourceBuilder);
        return bookinsgs;
    }

    public void save(BookingDto booking) {
        bookingElasticsearchRepository.save(booking);
    }

    public List<BookingDto> sitterBookings(String principal) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("sitter=\"%s\"", principal.replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

        List<BookingDto> res = bookingElasticsearchRepository.search(searchSourceBuilder);
        return res;
    }
}
