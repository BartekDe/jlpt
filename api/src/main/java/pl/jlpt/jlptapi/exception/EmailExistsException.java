package pl.jlpt.jlptapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EmailExistsException extends ResponseStatusException {
    public EmailExistsException() {
        super(HttpStatus.BAD_REQUEST, "User with this email already exists");
    }
}
