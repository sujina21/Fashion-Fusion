package com.example.demo.controllers;

import com.example.demo.auth.AuthService;
import com.example.demo.config.JwtService;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.CustomUserDetails;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.Cart;
import com.example.demo.entities.User;
import com.example.demo.repos.UserRepo;
import com.example.demo.services.CartService;
import com.example.demo.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class AuthenticationController {

    private final AuthService authService;
    private final UserService userService;
    private final CartService cartService;


    @PostMapping("/register")
    public ResponseEntity<?> add(@RequestBody UserDto userDto) {
        System.out.println(userDto);

        boolean userExists = userService.ifUserExists(userDto.getEmail());
        if (userExists) {
            return ResponseEntity.status(400).body("Email already exists");
        }

        User user = authService.register(userDto);
        Cart cart = cartService.createCart(user);
        user.setCart(cart);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.authenticate(authRequest));
    }

}
