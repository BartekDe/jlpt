package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.EditProfileDto;
import pl.jlpt.jlptapi.entity.AppUser;
import pl.jlpt.jlptapi.repository.AppUserRepository;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    AppUserRepository appUserRepository;

    @GetMapping("/users")
    public List<AppUser> showAllUsers() {
        return this.appUserRepository.findByEmail("email@gmail.com");
    }

    @PutMapping("/user/{user}")
    public ResponseEntity editUserProfile(@PathVariable AppUser user, @RequestBody EditProfileDto editProfileDto) {
        user.setUsername(editProfileDto.username);

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String password = passwordEncoder.encode(editProfileDto.password);
        user.setPassword(password);

        return new ResponseEntity(HttpStatus.OK);
    }
}
