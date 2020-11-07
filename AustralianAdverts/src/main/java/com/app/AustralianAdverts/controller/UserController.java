package com.app.AustralianAdverts.controller;

import com.app.AustralianAdverts.model.User;
import com.app.AustralianAdverts.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/get/{user_id}", produces = "application/json")
    public HashMap<String, Object> getUserById(@PathVariable UUID user_id) {
        return userService.getUserById(user_id);
    }

    @PostMapping(path = "/create-account", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> createAccount(@RequestBody User newUser) {
        return userService.createAccount(newUser);
    }

    @GetMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> login(@RequestBody User loginUser) {
        return userService.userLogin(loginUser);
    }

    @DeleteMapping(path = "/delete/{user_id}", produces = "application/json")
    public HashMap<String, Object> deleteUser(@PathVariable UUID user_id) {
        return userService.deleteUserById(user_id);
    }

    @PutMapping(path = "/update-user", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> updateUser(@RequestBody User updateUser) {
        return userService.updateUser(updateUser);
    }
}
