package petfinder.site.common.rating;


import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.RatingElasticsearchRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class RatingDao {
    @Autowired
    private RatingElasticsearchRepository ratingRepository;

    public Optional<RatingDto> findRating(String id) {
        return ratingRepository.find(id);
    }

    public List<RatingDto> findRatingByPrinciple(String principal) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        String queryString = String.format("sitterPrinciple=\"%s\"", principal.replace("\"", ""));
        searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
        return ratingRepository.search(searchSourceBuilder);
    }

    public void save(RatingDto rating) {
        ratingRepository.save(rating);
    }
}
