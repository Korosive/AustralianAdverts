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

    //Method to login by checking database
    public HashMap<String, Object> userLogin(User loginUser) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //Login details
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();

        //Checking username
        if (!checkUsernameUnique(username)) {
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

    //Method to get user by id
    public HashMap<String, Object> getUserById(UUID user_id) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //SQL statement to get user data from database
        String sql = "SELECT * FROM users WHERE user_id = ?";

        try {
            //Execute query for user
            User dbUser = jdbcTemplate.queryForObject(sql, new Object[]{user_id}, new UserMapper());
            //Populating response to successfully retrieving profile
            response.put("success", true);
            response.put("message", "Successfully retrieved profile.");
            response.put("user", dbUser);
            log.info("Successfully retrieved " + user_id.toString());
        } catch (DataAccessException exception) {
            //Populating response to failure of retrieving profile
            exception.printStackTrace();
            response.put("success", false);
            response.put("message", "Failed to retrieve profile.");
            log.warn("Failed to retrieve " + user_id.toString());
        }

        return response;
    }

    //Method to delete user from database with user id
    public HashMap<String, Object> deleteUserById(UUID user_id) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //SQL statement to delete user with user id
        String sql = "DELETE * FROM users WHERE user_id = ?";

        try {
            //Execute sql statement with id
            jdbcTemplate.update(sql, user_id);
            //Populating response to successfully deleted profile
            response.put("success", true);
            response.put("message", "Successfully deleted profile.");
            log.info("Successfully deleted user: " + user_id.toString());
        } catch (DataAccessException exception) {
            //Populating response to failure of deleting profile
            response.put("success", false);
            response.put("message", "Failed to delete profile.");
            log.warn("Failed to delete user: " + user_id.toString());
        }

        return response;
    }

    //Method to update user details in database
    public HashMap<String, Object> updateUser(User updateUser) {
        //Response variable
        HashMap<String, Object> response = new HashMap<>();
        //SQL statement
        String sql = "UPDATE users (email, username, password) VALUES (?, ?, ?) WHERE user_id = ?";
        //New user details entered by user
        String email = updateUser.getEmail();
        String username = updateUser.getUsername();
        String password = updateUser.getPassword();
        UUID user_id = updateUser.getUser_id();

        try {
            //Checks if new username is unique
            if (checkUpdateEmail(email, user_id)) {
                //Checks if new email is unique
                if (checkUpdateUsername(username, user_id)) {
                    //Executes SQL statement
                    jdbcTemplate.update(sql, email, username, encryptPassword(password), user_id);
                    //Populates response to successfully update
                    response.put("success", true);
                    response.put("message", "Successfully updated user details!");
                } else {
                    //Populates response to email not being unique
                    response.put("success", false);
                    response.put("message", "Email entered is already in use! Please try again.");
                }
            } else {
                //Populates response to username not being unique
                response.put("success", false);
                response.put("message", "Username entered is already in use! Please try again.");
            }
        } catch (DataAccessException exception) {
            exception.printStackTrace();
            //Populates response to failure to update
            response.put("success", false);
            response.put("message", "Failed to update user details!");
        }

        return response;
    }

    //Checks if email is unique except for row with user_id parameter
    private boolean checkUpdateEmail(String email, UUID user_id) {
        String sql = "SELECT * FROM users WHERE email = ? EXCEPT (SELECT * FROM users WHERE user_id = ?)";
        boolean unique;

        try {
            jdbcTemplate.query(sql, new Object[]{email, user_id}, new UserMapper());
            unique = false;
        } catch (DataAccessException exception) {
            unique = true;
        }

        return unique;
    }

    //Checks if username is unique except for row with user_id parameter
    private boolean checkUpdateUsername(String username, UUID user_id) {
        String sql = "SELECT * FROM users WHERE username = ? EXCEPT (SELECT * FROM users WHERE user_id = ?)";
        boolean unique;

        try {
            jdbcTemplate.query(sql, new Object[]{username, user_id}, new UserMapper());
            unique = false;
        } catch (DataAccessException exception) {
            unique = true;
        }

        return unique;
    }
}
