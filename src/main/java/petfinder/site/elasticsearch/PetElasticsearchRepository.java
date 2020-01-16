package petfinder.site.elasticsearch;

import org.springframework.stereotype.Service;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 2/7/18.
 */
@Service
public class PetElasticsearchRepository extends ElasticSearchJsonRepository<PetDto, String> {
	public PetElasticsearchRepository(ElasticSearchClientProvider provider) {
		super(new ElasticSearchIndex(provider, "petfinder-pets"), PetDto.class);
	}
}