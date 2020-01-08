package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.EditProfileDto;
import pl.jlpt.jlptapi.entity.AppUser;
import pl.jlpt.jlptapi.repository.AppUserRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    private EntityManager entityManager;

    @GetMapping("/users")
    public List<AppUser> showAllUsers() {
        return this.appUserRepository.findByEmail("email@gmail.com");
    }

    @PutMapping("/user/password")
    @Transactional
    public ResponseEntity editUserPassword(@RequestBody EditProfileDto editProfileDto, @AuthenticationPrincipal AppUser user) {

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String password = passwordEncoder.encode(editProfileDto.password);
        user.setPassword(password);

        this.entityManager.persist(user);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/user/username")
    @Transactional
    public ResponseEntity editUsername(@RequestBody EditProfileDto editProfileDto, @AuthenticationPrincipal AppUser user) {

        user.setUsername(editProfileDto.username);

        this.entityManager.persist(user);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.OK);
    }
}
