package com.example.demo.auth;

import com.example.demo.config.JwtService;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.CustomUserDetails;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.repos.UserRepo;
import com.example.demo.services.CustomUserDetailsService;
import com.example.demo.utils.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse authenticate(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );
        var user = userRepo.findByEmail(authRequest.getEmail())
                .orElseThrow();
        CustomUserDetails userDetails = new CustomUserDetails(user);
        HashMap<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole());
        var jwtToken = jwtService.generateToken(extraClaims, userDetails);

        return AuthResponse.builder()
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    public User register(UserDto userDto) {

        String userRole = userDto.getEmail().equals("sujinasht307@gmail.com")// malai matra admin banauni ,mabahek sab lai user
                ? "ROLE_ADMIN" : "ROLE_USER";

        var user = User.builder()
                .email(userDto.getEmail())
                .password(PasswordEncoderUtil.bCryptPasswordEncoder()
                        .encode(userDto.getPassword()))
                .username(userDto.getUsername())
                .role(userRole)
                .phone_number(userDto.getPhone_number())
                .build();
        return userRepo.save(user);
    }
}
