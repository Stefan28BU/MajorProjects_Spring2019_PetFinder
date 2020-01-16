package petfinder.site.common.Notification;

import alloy.util.Momento;

import java.util.Date;
import java.util.UUID;

public class NotificationDto implements Momento<String>{
    private String id;
    private String userPrinciple;
    private String read;
    private String info;
    private Date createDate;

    public String getRead() {
        return read;
    }

    public void setRead(String read) {
        this.read = read;
    }

    public Date getCreateDate() {
        return createDate;
    }



    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public void read() {
        read = "Y";
    }

    public NotificationDto(String userPrinciple, String info) {
        this.userPrinciple = userPrinciple;
        this.info = info;
    }

    public NotificationDto() {
        this.createDate = new Date();

        // Randomly generate an id when constructing a pet object.
        this.id = UUID.randomUUID().toString();
        read = "N";
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserPrinciple() {
        return userPrinciple;
    }

    public void setUserPrinciple(String userPrinciple) {
        this.userPrinciple = userPrinciple;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String getMomento() {
        return id;
    }
}
