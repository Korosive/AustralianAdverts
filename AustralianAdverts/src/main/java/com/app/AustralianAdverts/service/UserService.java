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
import java.util.List;
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
        String sql = "INSERT INTO users (user_id, email, username, password, date_created) VALUES (?, ?, ?, ?, ?)";
        //New user data
        String email = newUser.getEmail();
        String username = newUser.getUsername();
        String password = newUser.getPassword();

        if (checkEmailExists(email)) {
            //Populating response to non-unique username
            response.put("success", false);
            response.put("message", "Account already exists with email.");
            log.warn("Failed to create a new account because email already in use.");
        } else if (checkUsernameExists(username)) {
            //Populating response to non-unique username
            response.put("success", false);
            response.put("message", "Account already exists with email.");
            log.warn("Failed to create a new account because email already in use.");
        } else {
            try {
                //Encrypting password with method
                String encryptedPassword = encryptPassword(password);
                //Execute SQL statement
                jdbcTemplate.update(sql, UUID.randomUUID(), email, username, encryptedPassword, new Date());
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
        }

        return response;
    }

    private boolean checkUsernameExists(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        boolean success;

        try {
            List<User> listUser = jdbcTemplate.query(sql, new Object[]{username}, new UserMapper());
            if (listUser.size() == 0) {
                success = false;
            } else {
                success = true;
            }
        } catch (DataAccessException exception) {
            success = false;
            log.warn("Username does not exist");
        }

        return success;
    }

    private boolean checkEmailExists(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        boolean success;

        try {
            List<User> listUser = jdbcTemplate.query(sql, new Object[]{email}, new UserMapper());
            if (listUser.size() == 0) {
                success = false;
            } else {
                success = true;
            }
        } catch (DataAccessException exception) {
            success = false;
            log.warn("Email does not exist");
        }

        return success;
    }

    //Method to encrypt password
    private String encryptPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    //Method to login by checking database
    public HashMap<String, Object> userLogin(User loginUser) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //Login details
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();

        //Checking username
        if (checkUsernameExists(username)) {
            //Prepared SQL statement to get user from database
            String sql = "SELECT * FROM users WHERE username = ?";
            //Executes SQL statement to get user
            User dbUser = jdbcTemplate.queryForObject(sql, new Object[]{username}, new UserMapper());
            //Gets password of user from database
            String dbPassword = dbUser.getPassword();
            //Checks if password from database is the same as login password
            if (checkPassword(password, dbPassword)) {
                response.put("success", true);
                response.put("message", "Successfully logged in!");
                log.info("Username and password match and login success.");
            } else {
                response.put("success", false);
                response.put("message", "Failed to login. Password does not match.");
                log.warn("Password does not match in attempt to login");
            }
        } else {
           response.put("success", false);
           response.put("message", "Failed to login. Username either does not exist or is incorrect.");
           log.warn("Username does not match in attempt to login");
        }

        return response;
    }

    //Method to check password
    private boolean checkPassword(String loginPassword, String dbPassword) {
        return BCrypt.checkpw(loginPassword, dbPassword);
    }
}
