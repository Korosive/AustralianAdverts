package com.app.AustralianAdverts.controller;

import com.app.AustralianAdverts.model.Advert;
import com.app.AustralianAdverts.service.AdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@RestController
@RequestMapping(path = "/adverts")
public class AdvertController {

    @Autowired
    private AdvertService advertService;

    @GetMapping(path = "/get/adverts", produces = "application/json")
    public List<Advert> getAdverts() {
        return advertService.getAdverts();
    }

    @PostMapping(path = "/create-advert", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> createAdvert(@RequestBody Advert newAdvert) {
        return advertService.createAdvert(newAdvert);
    }
}
