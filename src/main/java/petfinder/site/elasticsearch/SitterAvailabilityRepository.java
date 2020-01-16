package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.user.sitter.SitterAvailabilityDto;

/**
 * Created by jlutteringer on 1/16/18.
 */
@Service
public class SitterAvailabilityRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<SitterAvailabilityDto, String> {
    @Autowired
    public SitterAvailabilityRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-sitter-availability"), SitterAvailabilityDto.class);
    }
}