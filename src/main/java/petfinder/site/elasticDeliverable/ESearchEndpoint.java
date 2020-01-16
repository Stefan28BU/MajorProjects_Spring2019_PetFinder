package petfinder.site.elasticDeliverable;

import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping(value = "/elastic/")
public class ESearchEndpoint {

    @Autowired
    ExESearchService service;

    @GetMapping(value = "/getEx", produces = "application/json")
    public ExDto getCount() {

        Optional<ExDto> ret;
        try {
            ret = service.findDto("0");
        } catch (Exception e) {
            service.createIndx();

            ret = service.findDto("0");
        }


        if(ret.isPresent()) {
            return ret.get();
        } else {

            ExDto created = new ExDto();
            created.setId("0");
            System.out.println(created.getId());
            created.setStr1("Str1 " + created.getId());
            created.setStr2("Yo");
            service.save(created);
            created.setStr1("Just a test");
            created.setStr2("Not sure how to handle optionals yet.");
            return created;
        }

    }
}
