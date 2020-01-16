package petfinder.site.elasticDeliverable;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;
import petfinder.site.common.pet.PetDto;
import petfinder.site.elasticsearch.PetElasticsearchRepository;

import java.util.Optional;

@Repository
public class ExDao {
    @Autowired
    private ExESearchRepository repo;

    @Autowired
    private ElasticSearchClientProvider elasticSearchClientProvider;

    public Optional<ExDto> findDto(String id) {
        return repo.find(id);
    }

    public RestHighLevelClient getClient() {return elasticSearchClientProvider.getClient();}

    public void save(ExDto example) {
        repo.save(example);
    }
}