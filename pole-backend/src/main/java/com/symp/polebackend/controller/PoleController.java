package com.symp.polebackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.symp.polebackend.items.Pole;
import com.symp.polebackend.repositories.PoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class PoleController {

    @Autowired
    private PoleRepo poleRepo;

    public static String uploadDir = "src/main/resources/json";


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

    @PostMapping("/poles/upload")
    public void uploadPage(@RequestPart(value = "files", required = true) MultipartFile[] files) {
        StringBuilder fileNames = new StringBuilder();
        for (MultipartFile file : files) {

            Path fileNameAndPath = Paths.get(uploadDir, file.getOriginalFilename());
            fileNames.append(file.getOriginalFilename());

            ObjectMapper mapper = new ObjectMapper();
            TypeReference<Pole> typeReference = new TypeReference<Pole>() {};

            try {
                Files.write(fileNameAndPath, file.getBytes());
                InputStream inputStream = file.getInputStream();

                Pole pole = mapper.readValue(inputStream, typeReference);
                poleRepo.save(pole);

            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

}
