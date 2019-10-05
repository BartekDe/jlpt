package pl.jlpt.jlptapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UsernameExistsException extends ResponseStatusException {
    public UsernameExistsException() {
        super(HttpStatus.BAD_REQUEST, "User with this username already exists");
    }
}
