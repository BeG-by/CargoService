package by.itechart.cargo;

import by.itechart.cargo.elasticsearch.ElasticsearchTestDataInserter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.core.env.Environment;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CargoApplication {

    private RedisServer redisServer;
    private Environment environment;
    private ElasticsearchTestDataInserter testDataInserter;

    @Autowired
    public CargoApplication(Environment environment, ElasticsearchTestDataInserter testDataInserter) {
        this.environment = environment;
        this.testDataInserter = testDataInserter;
    }


    @PostConstruct
    public void init() {

        if (environment.getActiveProfiles().length == 0) {

            redisServer = RedisServer.builder()
                    .setting("maxmemory 128M")
                    .build();

            redisServer.start();
        }

        testDataInserter.insertTestData();
    }

    public static void main(String[] args) {
        SpringApplication.run(CargoApplication.class, args);
    }

    @PreDestroy
    public void destroy() {

        if (redisServer != null) {
            redisServer.stop();
        }

    }

}
