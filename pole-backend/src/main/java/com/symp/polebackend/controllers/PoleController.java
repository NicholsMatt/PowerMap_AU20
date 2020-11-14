package com.symp.polebackend.controllers;

import com.symp.polebackend.service.PoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PoleController {

    private PoleService poleService;
    @GetMapping("/poles")


}
