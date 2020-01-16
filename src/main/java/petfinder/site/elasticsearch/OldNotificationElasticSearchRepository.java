package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.Notification.NotificationDto;

@Service
public class OldNotificationElasticSearchRepository extends ElasticSearchRepository.ElasticSearchJsonRepository<NotificationDto, String>{
    @Autowired
    public OldNotificationElasticSearchRepository(ElasticSearchClientProvider provider) {
        super(new ElasticSearchIndex(provider, "petfinder-old-notification"), NotificationDto.class);
    }
}
