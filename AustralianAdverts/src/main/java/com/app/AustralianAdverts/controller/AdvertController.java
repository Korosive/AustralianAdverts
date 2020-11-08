package com.app.AustralianAdverts.controller;

import com.app.AustralianAdverts.model.Advert;
import com.app.AustralianAdverts.service.AdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/adverts")
public class AdvertController {

    @Autowired
    private AdvertService advertService;

    @GetMapping(path = "/get/{advert_id}", produces = "application/json")
    public HashMap<String, Object> getAdvertById(@PathVariable UUID advert_id) {
        return advertService.getAdvertById(advert_id);
    }

    @GetMapping(path = "/get/user/{user_id}", produces = "application/json")
    public HashMap<String, Object> getUserAdverts(@PathVariable UUID user_id) {
        return advertService.getUserAdverts(user_id);
    }

    @GetMapping(path = "/get/live", produces = "application/json")
    public List<Advert> getLiveAdverts() {
        return advertService.getLiveAdverts();
    }

    @PutMapping(path = "/update-advert", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> updateAdvert(@RequestBody Advert updateAdvert) {
        return advertService.updateAdvert(updateAdvert);
    }

    @DeleteMapping(path = "/delete/{advert_id}", produces = "application/json")
    public HashMap<String, Object> deleteAdvert(@PathVariable UUID advert_id) {
        return advertService.deleteAdvertById(advert_id);
    }

    @PutMapping(path = "/update-paid/{advert_id}", produces = "application/json")
    public HashMap<String, Object> updatePaid(@PathVariable UUID advert_id) {
        return advertService.updatePaid(advert_id);
    }

    @PostMapping(path = "/create-advert", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> createAdvert(@RequestBody Advert newAdvert) {
        return advertService.createAdvert(newAdvert);
    }

    @PutMapping(path = "/change-status", produces = "application/json")
    public HashMap<String, Object> changeStatus(@RequestBody HashMap<String, Object> statusChange) {
        UUID advert_id = (UUID) statusChange.get("advert_id");
        String status = statusChange.get("status").toString();
        return advertService.changeStatus(advert_id, status);
    }
}
