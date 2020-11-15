package com.app.AustralianAdverts.controller;

import com.app.AustralianAdverts.model.User;
import com.app.AustralianAdverts.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/create-account", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> createAccount(@RequestBody User newUser) {
        return userService.createAccount(newUser);
    }

    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public HashMap<String, Object> login(@RequestBody User loginUser) {
        return userService.userLogin(loginUser);
    }
}
