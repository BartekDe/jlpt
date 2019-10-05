package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.jlptapi.dto.request.AuthenticationRequestDto;
import pl.jlpt.jlptapi.dto.request.UserRegisterDto;
import pl.jlpt.jlptapi.repository.AppUserRepository;
import pl.jlpt.jlptapi.security.jwt.JwtTokenProvider;
import pl.jlpt.jlptapi.service.UserRegisterService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRegisterService userRegisterService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationRequestDto loginData) {
        try {
            String username = loginData.getUsername();
            String password = loginData.getPassword();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String token = jwtTokenProvider.createToken(username, this.appUserRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found")).getRoles());

            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            return ResponseEntity.ok(model);

        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserRegisterDto registrationData) {
        this.userRegisterService.registerUser(registrationData);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
