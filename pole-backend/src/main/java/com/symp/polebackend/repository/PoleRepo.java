package com.symp.polebackend.repository;

import com.symp.polebackend.items.Pole;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PoleRepo extends MongoRepository<Pole, Long> {

}
