package petfinder.site.elasticDeliverable;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.stereotype.Service;

@Service
public class ExESearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<ExDto, String> {
    public ExESearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-example"), ExDto.class);
    }
}