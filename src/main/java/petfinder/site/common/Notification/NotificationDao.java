package petfinder.site.common.Notification;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.elasticsearch.NotificationElasticsearchRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class NotificationDao {
    @Autowired
    private NotificationElasticsearchRepository notificationRepository;

    public Optional<NotificationDto> findNotification(String id) {
        return notificationRepository.find(id);
    }

    public void save(NotificationDto notification) {
        notificationRepository.save(notification);
    }
}
