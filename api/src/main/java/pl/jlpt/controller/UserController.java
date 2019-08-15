package pl.jlpt.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.entity.User;

@RestController
public class UserController {

    @GetMapping("/getUser")
    public User showSingleUserAction(long id) {

    }
}
