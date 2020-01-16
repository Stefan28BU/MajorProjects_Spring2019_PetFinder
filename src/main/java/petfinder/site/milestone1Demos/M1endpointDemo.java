package petfinder.site.milestone1Demos;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;

@RestController
@RequestMapping(value = "/m1/endP")
public class M1endpointDemo {

    @Autowired
    M1serviceDemo counter;


    @GetMapping(value = "/count", produces = "application/json")
    public ArrayList<String> getCount() {

        //System.out.println("ENDPOINT HIT");
        return counter.exampleService();
    }

}
