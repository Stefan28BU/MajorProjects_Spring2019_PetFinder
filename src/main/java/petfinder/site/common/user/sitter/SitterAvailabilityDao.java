package petfinder.site.common.user.sitter;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.user.UserDto;
import petfinder.site.elasticsearch.SitterAvailabilityRepository;

import java.util.List;
import java.util.Optional;

/**
 * queries
 */
@Repository
public class SitterAvailabilityDao {
    @Autowired
    private SitterAvailabilityRepository sitterAvailabilityRepository;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<SitterAvailabilityDto> findAvailability(String id) {
        Optional<SitterAvailabilityDto> temp = sitterAvailabilityRepository.find(id);
        if (temp.isPresent()) {
            System.out.println(temp.get().getAvailability());
        }
        return temp;
    }
    public Optional<SitterAvailabilityDto> findAvailabilityByUserID(UserDto user) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        System.out.println("searching: " + user.getPrincipal());
        String queryString = String.format("principal=\"%s\"", user.getPrincipal().replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
        return sitterAvailabilityRepository.search(searchSourceBuilder).stream().findFirst();
    }

    public List<SitterAvailabilityDto> findAllAvailability() {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        searchSourceBuilder.size(100);
        return sitterAvailabilityRepository.search(searchSourceBuilder);
    }

    public void save(SitterAvailabilityDto sitterAvailabilityDto) {
        sitterAvailabilityRepository.save(sitterAvailabilityDto);
    }
}
