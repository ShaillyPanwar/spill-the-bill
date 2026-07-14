package com.spillthebill.user.service;

import com.spillthebill.user.dto.LoginRequest;
import com.spillthebill.user.dto.LoginResponse;
import com.spillthebill.user.dto.RegisterRequest;
import com.spillthebill.user.dto.UserResponse;
import com.spillthebill.user.entity.User;
import com.spillthebill.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService{
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public void register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request){

        System.out.println("===== LOGIN START =====");

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("User not found");
                    return new RuntimeException("User not found");
                });

        System.out.println("User found");

        boolean matched = passwordEncoder.matches(request.getPassword(), user.getPassword());

        System.out.println("Password matched = " + matched);

        if (!matched) {
            System.out.println("Throwing Invalid Credentials Exception");
            throw new RuntimeException("Invalid credentials");
        }

        System.out.println("Login successful");

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return new LoginResponse(
                "Login successful",
                userResponse
        );
    }

}
