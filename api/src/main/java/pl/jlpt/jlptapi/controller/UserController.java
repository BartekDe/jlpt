package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity editUserProfile(@PathVariable AppUser user) {
        return new ResponseEntity(HttpStatus.OK);
    }
}
