package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.AuthenticationRequestDto;
import pl.jlpt.jlptapi.dto.request.UserRegisterDto;
import pl.jlpt.jlptapi.entity.AppUser;
import pl.jlpt.jlptapi.repository.AppUserRepository;
import pl.jlpt.jlptapi.security.jwt.JwtTokenProvider;
import pl.jlpt.jlptapi.service.UserRegisterService;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

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

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/login")
    @Transactional
    public ResponseEntity login(@RequestBody AuthenticationRequestDto loginData) {
        try {
            String username = loginData.getUsername();
            String password = loginData.getPassword();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            AppUser user = this.appUserRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

            user.setLastActivity(Timestamp.valueOf(LocalDateTime.now()));
            this.entityManager.persist(user);
            this.entityManager.flush();

            String token = jwtTokenProvider.createToken(username, user.getRoles());

            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            return ResponseEntity.ok(model);

        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody UserRegisterDto registrationData) {
        this.userRegisterService.registerUser(registrationData);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/me")
    public ResponseEntity currentUser(@AuthenticationPrincipal UserDetails userDetails){
        Map<Object, Object> model = new HashMap<>();
        model.put("username", userDetails.getUsername());
        model.put("roles", userDetails.getAuthorities()
                .stream()
                .map(a -> ((GrantedAuthority) a).getAuthority())
                .collect(toList())
        );
        return ResponseEntity.ok(model);
    }
}
