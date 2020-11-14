package com.symp.polebackend.config;

import com.symp.polebackend.items.Pole;
import com.symp.polebackend.repository.PoleRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = PoleRepo.class)
@Configuration
public class RepoConfig {

    @Bean
    CommandLineRunner commandLineRunner(PoleRepo poleRepo) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                poleRepo.save(new Pole(1, -83.0472, 39.9969));
            }
        };
    }

}
