package petfinder.site.elasticDeliverable;

import alloy.util.Momento;

import java.util.UUID;

public class ExDto implements Momento<String> {
    private String id;
    private String str1;

    public String getStr1() {
        return str1;
    }

    public void setStr1(String str1) {
        this.str1 = str1;
    }

    public String getStr2() {
        return str2;
    }

    public void setStr2(String str2) {
        this.str2 = str2;
    }

    private String str2;

    public ExDto() {
        // Randomly generate an id when constructing a pet object.
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    @Override
    public String getMomento() {
        return id;
    }
}