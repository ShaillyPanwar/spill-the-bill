package com.spillthebill.user.controller;

import com.spillthebill.user.dto.LoginRequest;
import com.spillthebill.user.dto.LoginResponse;
import com.spillthebill.user.dto.RegisterRequest;
import com.spillthebill.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    public AuthController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request){
        userService.register(request);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
