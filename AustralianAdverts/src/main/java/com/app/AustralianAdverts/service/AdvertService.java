package com.app.AustralianAdverts.service;

import com.app.AustralianAdverts.model.Advert;
import com.app.AustralianAdverts.util.AdvertMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdvertService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    //Method to add new advert to database
    public HashMap<String, Object> createAdvert(Advert newAdvert) {
        //Create response in the form of a hashmap (a.k.a dictionary/json format)
        HashMap<String, Object> response = new HashMap<>();
        //Prepared SQL statement to insert into database
        String sql = "INSERT INTO adverts (advert_id, user_id, title, description, date_created, primary_contact_method, primary_contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)";
        //Creates new UUID for advert
        UUID advert_id = UUID.randomUUID();
        UUID user_id = newAdvert.getUser_id();
        //Getting new advert data
        String title = newAdvert.getTitle();
        String description = newAdvert.getDescription();
        Date date_created = new Date();
        String primary_contact_method = newAdvert.getPrimary_contact_method();
        String primary_contact_info = newAdvert.getPrimary_contact_info();

        //Executing SQL statement to add to database
        try {
            jdbcTemplate.update(sql, advert_id, user_id, title, description, date_created, primary_contact_method, primary_contact_info);
            log.info("\"{}\" advert has been created successfully!", title);
            response.put("success", true);
            response.put("message", "New advert has been created successfully!");
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Advert has failed to be created!");
            response.put("success", false);
            response.put("message","Failed to create new advert! Please try again!");
        }

        return response;
    }

    //Getting list of live adverts ordered by creation date starting from latest
    public List<Advert> getAdverts() {
        //Creating list for adverts
        List<Advert> responseList = new ArrayList<>();
        //Prepared SQL statement
        String sql = "SELECT * FROM adverts";
        //Getting list of adverts created by a user
        try {
            responseList = jdbcTemplate.query(sql, new AdvertMapper());
            log.info("Successfully retrieved a list of live adverts.");
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Failed to retrieve list of live adverts!");
        }

        return responseList;
    }

}
