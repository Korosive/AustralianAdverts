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
        String sql = "INSERT INTO adverts (advert_id, user_id, title, description, start_date, end_date, date_created, status, payment, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        //Creates new UUID for advert
        UUID advert_id = UUID.randomUUID();
        //Getting new advert data
        String title = newAdvert.getTitle();
        String description = newAdvert.getDescription();
        Date start_date = newAdvert.getStart_date();
        Date end_date = newAdvert.getEnd_date();
        Date date_created = new Date();
        String status = newAdvert.getStatus();
        boolean paid = newAdvert.isPaid();

        //Executing SQL statement to add to database
        try {
            jdbcTemplate.update(sql, advert_id, title, description, start_date, end_date, date_created, status, paid);
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

    //Retrieves an advert by its id
    public HashMap<String, Object> getAdvertById(UUID advert_id) {
        //Creating a response variable
        HashMap<String, Object> response = new HashMap<>();
        //Prepared SQL statement
        String sql = "SELECT * FROM adverts WHERE advert_id = ?";

        //Getting advert and returning to front-end
        try {
            Advert getAdvert = jdbcTemplate.queryForObject(sql, new Object[]{advert_id}, new AdvertMapper());
            response.put("success", true);
            response.put("message", "Retrieved advert: \"" + getAdvert.getTitle() + "\"!");
            response.put("advert", getAdvert);
            log.info("Successfully retrieved advert: " + advert_id);
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Failed to retrieve advert: " + advert_id);
            response.put("success", false);
            response.put("message", "Failed to retrieve advert! Please try again!");
        }

        return response;
    }

    //Getting list of adverts created by a user
    public HashMap<String, Object> getUserAdverts(UUID user_id) {
        //Creating a response variable
        HashMap<String, Object> response = new HashMap<>();
        //Prepared SQL statement
        String sql = "SELECT * FROM adverts WHERE user_id = ?";

        //Getting list of adverts created by a user
        try {
            List<Advert> getAdvert = jdbcTemplate.query(sql, new Object[]{user_id}, new AdvertMapper());
            response.put("success", true);
            response.put("message", "Retrieved a list of your adverts!");
            response.put("advert", getAdvert);
            log.info("Successfully retrieved a list of adverts for " + user_id);
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Failed to retrieve list of adverts for " + user_id);
            response.put("success", false);
            response.put("message", "Failed to retrieve your list of adverts! Please try again!");
        }

        return response;
    }

    //Getting list of live adverts ordered by creation date starting from latest
    public List<Advert> getLiveAdverts() {
        //Creating list for adverts
        List<Advert> responseList = new ArrayList<>();
        //Prepared SQL statement
        String sql = "SELECT * FROM adverts WHERE status = \"LIVE\" && start_date > ? ORDER BY date_created DESC";
        //Current date
        Date current_date = new Date();
        //Getting list of adverts created by a user
        try {
            responseList = jdbcTemplate.query(sql, new Object[]{current_date}, new AdvertMapper());
            log.info("Successfully retrieved a list of live adverts.");
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Failed to retrieve list of live adverts!");
        }

        return responseList;
    }

    //Updating an advert by its id
    public HashMap<String, Object> updateAdvert(Advert updateAdvert) {
        //Creating response variable
        HashMap<String, Object> response = new HashMap<>();
        //Prepared SQL statement
        String sql = "UPDATE adverts SET (title = ?, description = ?, start_date = ?, end_date = ?, status = ?, payment = ?) WHERE advert_id = ?";
        //Getting new advert data and advert id
        String title = updateAdvert.getTitle();
        String description = updateAdvert.getDescription();
        Date start_date = updateAdvert.getStart_date();
        Date end_date = updateAdvert.getEnd_date();
        String status = updateAdvert.getStatus();
        double payment = updateAdvert.getPayment();
        UUID advert_id = updateAdvert.getAdvert_id();

        //Executing update of advert
        try {
            jdbcTemplate.update(sql, title, description, start_date, end_date, status, payment, advert_id);
            response.put("success", true);
            response.put("message", "Successfully updated \"" + title + "\"");
            log.info("Successfully update \"" + title + "\"");
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            log.warn("Failed to update \"" + title + "\"");
            response.put("success", false);
            response.put("message", "Failed to update \"" + title + "\"");
        }

        return response;
    }

    //Updating the payment status of advert
    public boolean updatePaid(UUID advert_id) {
        //Success of update
        boolean success = true;
        //Prepared SQL statement
        String sql = "UPDATE adverts SET (paid = true) WHERE advert_id = ?";

        //Executing update
        try {
            jdbcTemplate.update(sql, advert_id);
            log.info("Updated the payment status of " + advert_id.toString());
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            success = false;
            log.info("Failed to update the payment status of " + advert_id.toString());
        }

        return success;
    }
}
