package com.symp.polebackend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.symp.polebackend.items.Pole;
import com.symp.polebackend.repositories.PoleRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@EnableMongoRepositories(basePackageClasses = PoleRepo.class)
@Configuration
public class PoleConfig {

    @Bean
    CommandLineRunner commandLineRunner(PoleRepo poleRepo) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//                poleRepo.deleteAll();

                ObjectMapper mapper = new ObjectMapper();
                TypeReference<List<Pole>> typeReference = new TypeReference<List<Pole>>() {};
                InputStream inputStream = TypeReference.class.getResourceAsStream("/json/poles_data.json");

                try {
                    List<Pole> poles = mapper.readValue(inputStream, typeReference);

                    for (Pole p : poles) {
                        poleRepo.save(p);
                    }

                } catch (IOException e) {
                    System.out.println("Unable to add poles: " + e.getMessage());
                }


//
//                File[] files = new File("src/main/resources/json").listFiles();
//
//                for (File file : files) {
//                    InputStream inputStream = TypeReference.class.getResourceAsStream("/json/" + file.getName());
//                    try {
//                        Pole pole = mapper.readValue(inputStream, typeReference);
//                        poleRepo.save(pole);
//
//                    } catch (IOException e) {
//                        System.out.println("Unable to save users: " + e.getMessage());
//                    }
//                }


            }
        };
    }

}
