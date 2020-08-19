package by.itechart.cargo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication (exclude = { SecurityAutoConfiguration.class })
public class CargoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CargoApplication.class, args);
    }

}
