package petfinder.site.elasticDeliverable;

import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class ExESearchService {
    @Autowired
    private ExDao exDao;

    public Optional<ExDto> findDto(String id) {
        return exDao.findDto(id);
    }

    public void createIndx() {
        System.out.println("Index creation was attempted");
        CreateIndexRequest req = new CreateIndexRequest("petfinder-example");
        try {
            exDao.getClient().indices().create(req);
        } catch(IOException e) {
            System.out.println("Create index error");
            e.printStackTrace();
        }
    }

    public void save(ExDto src) {
        exDao.save(src);
    }
}