package com.spillthebill.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration //indicates this class contains  bean definitions
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http //defining custom security rules
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable()) //disabling csrf security
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/groups/**").permitAll()
                        .requestMatchers("/api/expenses/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}

