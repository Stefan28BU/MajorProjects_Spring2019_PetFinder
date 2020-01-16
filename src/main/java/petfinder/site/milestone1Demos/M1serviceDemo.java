package petfinder.site.milestone1Demos;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;

//Very basic class just used for testing as an endpoint

@Service
public class M1serviceDemo {
    private int count = 0;


    public ArrayList<String> exampleService() {

        count++;
        //System.out.println(Integer.toString(count));
        ArrayList<String> arr = new ArrayList<String>();
        arr.add(Integer.toString(count));
        arr.add("Test");
        return arr;
    }


    public ArrayList<Object> dataAccess() {

        //System.out.println(Integer.toString(count));
        ArrayList<Object> arr = new ArrayList<>();
        arr.add("Test");
        return arr;
    }
}
