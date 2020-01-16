package petfinder.site.elasticsearch;


import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.pet.PetDto;

@Service
public class NotificationElasticsearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<NotificationDto, String> {
    @Autowired
    public NotificationElasticsearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-notification"), NotificationDto.class);
    }
}
