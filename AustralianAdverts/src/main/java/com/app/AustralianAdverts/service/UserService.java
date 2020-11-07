package com.app.AustralianAdverts.service;

import com.app.AustralianAdverts.model.User;
import com.app.AustralianAdverts.util.BCrypt;
import com.app.AustralianAdverts.util.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    //Method for user to create account with checks in place
    public HashMap<String, Object> createAccount(User newUser) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //Prepared SQL statement
        String sql = "INSERT INTO adverts (user_id, email, username, password, date_created) VALUES (?, ?, ?, ?, ?)";
        //New user data
        String email = newUser.getEmail();
        String username = newUser.getUsername();
        String password = newUser.getPassword();

        //Called method to check if email is unique/not already in database
        if (checkEmailUnique(email)) {
            //Called method to check if username is unique/not already in database
            if (checkUsernameUnique(username)) {
                try {
                    //Encrypting password with method
                    String encryptedPassword = encryptPassword(password);
                    //Generating UUID and current date
                    UUID user_id = UUID.randomUUID();
                    Date date_created = new Date();
                    //Execute SQL statement
                    jdbcTemplate.update(sql, user_id, email, encryptedPassword, date_created);
                    //Populating response to success
                    response.put("success", true);
                    response.put("message", "Successfully created a new account!");
                    log.info("Successfully created a new account: " + username);
                } catch (DataAccessException exception) {
                    //Print error
                    exception.printStackTrace();
                    //Populating response to failure
                    response.put("success", false);
                    response.put("message", "Failed to create a new account! Please try again.");
                    log.warn("Failed to create a new account: " + username);
                }
            } else {
                //Populating response to non-unique email
                response.put("success", false);
                response.put("message", "Email is already associated with an account! Please login with the account associated with this email or use a new email.");
                log.warn("Failed to create a new account because email already in use.");
            }
        } else {
            //Populating response to non-unique username
            response.put("success", false);
            response.put("message", "Username is already in use! Please login with the account associated with this username or use a new username.");
            log.warn("Failed to create a new account because username already in use.");
        }

        return response;
    }

    //Method to check if email is in database
    private boolean checkEmailUnique(String email) {
        String sql = "SELECT user_id FROM users WHERE email = ?";
        boolean success = false;

        try {
            jdbcTemplate.query(sql, new Object[]{email}, new UserMapper());
        } catch (DataAccessException exception) {
            success = true;
        }

        return success;
    }

    //Method to check if username is in database
    private boolean checkUsernameUnique(String username) {
        String sql = "SELECT user_id FROM users WHERE username = ?";
        boolean success = false;

        try {
            jdbcTemplate.query(sql, new Object[]{username}, new UserMapper());
        } catch (DataAccessException exception) {
            success = true;
        }

        return success;
    }

    //Method to encrypt password
    private String encryptPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
}
