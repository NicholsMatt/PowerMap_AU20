package com.symp.polebackend.controller;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.symp.polebackend.items.Pole;
import com.symp.polebackend.items.pole_data;
import com.symp.polebackend.repositories.PoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
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

    public static String uploadDir = "src/main/resources/static";


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

    @DeleteMapping("/poles/{id}")
    public void deletePole(@PathVariable long id) {
        poleRepo.deleteById(id);
    }

    @GetMapping("/images/{filename}")
    public File getFile(@PathVariable String filename) throws FileNotFoundException {

        File file = new File(uploadDir + filename);
        return file;
    }

    @PostMapping("/poles/upload")
    public void uploadImage(@RequestPart(value = "image") MultipartFile[] files) throws ImageProcessingException, IOException {
        for (MultipartFile f : files) {
            Path fileNameAndPath = Paths.get(uploadDir, f.getOriginalFilename());

            //Attempt to write file to static directory
            try {
                Files.write(fileNameAndPath, f.getBytes());

                File file = new File(uploadDir + "/" + f.getOriginalFilename());
                Metadata metadata = ImageMetadataReader.readMetadata(file);

                GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);

                try {
                    GeoLocation location = gpsDirectory.getGeoLocation();
                    double lat = location.getLatitude();
                    System.out.println("lat: " + lat);
                    double lng = location.getLongitude();
                    System.out.println("lng: " + lng);

                    boolean add = true;
                    for (Pole p : poleRepo.findAll()) {
                        if (add && p.getPole_data().getCoordinates()[0] == lng) {
                            p.getPole_data().addPole_name(f.getOriginalFilename());
                            add = false;
                        }
                    }

                    if (add) {
                        double[] coords = {lng, lat};
                        poleRepo.save(new Pole(poleRepo.findAll().size() + 1, new pole_data(coords, "N/A")));
                    }



                } catch (Exception e) {
                    System.out.println("ERROR: Geolocation not found!");
                    e.printStackTrace();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }


        }
    }

//    @PostMapping("/poles/upload")
//    public void uploadPage(@RequestPart(value = "files", required = true) MultipartFile[] files) {
//        StringBuilder fileNames = new StringBuilder();
//        for (MultipartFile file : files) {
//
//            Path fileNameAndPath = Paths.get(uploadDir, file.getOriginalFilename());
//            fileNames.append(file.getOriginalFilename());
//
//            ObjectMapper mapper = new ObjectMapper();
//            TypeReference<Pole> typeReference = new TypeReference<Pole>() {};
//
//            try {
//                Files.write(fileNameAndPath, file.getBytes());
//                InputStream inputStream = file.getInputStream();
//
//                Pole pole = mapper.readValue(inputStream, typeReference);
//                poleRepo.save(pole);
//
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//
//        }
//
//    }

}
