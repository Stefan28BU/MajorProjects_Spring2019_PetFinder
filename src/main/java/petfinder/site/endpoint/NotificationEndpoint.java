package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.Notification.NotificationService;
import petfinder.site.common.user.UpdateRequest;
import petfinder.site.common.user.UserDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notification")
public class NotificationEndpoint {
    @Autowired
    private NotificationService notificationService;

    /**
     * get notification via user principal
     * @param id
     * @return
     */
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<NotificationDto> getNotification(@PathVariable("id") String id) {

        return notificationService.findNotification(id);
    }

    /**
     * add a notification
     * @param notiId
     * @return
     */
    @PostMapping(value = "/readNoti")
    public String save(@RequestBody String notiId) {
        return notificationService.readNotification(notiId);
    }


}
