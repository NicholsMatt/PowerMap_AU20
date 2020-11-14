package com.symp.polebackend.controller;

import com.symp.polebackend.items.Pole;
import com.symp.polebackend.repository.PoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PoleController {

    @Autowired
    private PoleRepo poleRepo;

    @GetMapping("/poles")
    public Iterable<Pole> poles() {
        return poleRepo.findAll();
    }

    @GetMapping("/poles/{id}")
    public Optional<Pole> getPole(@PathVariable long id) {
        return poleRepo.findById(id);
    }

    @PostMapping("/poles")
    public void addPole(@RequestBody Pole newPole) {
        poleRepo.save(newPole);
    }



}
