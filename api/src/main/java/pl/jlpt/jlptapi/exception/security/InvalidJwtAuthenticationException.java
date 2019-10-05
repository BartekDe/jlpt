package pl.jlpt.jlptapi.exception.security;

import org.springframework.security.core.AuthenticationException;

public class InvalidJwtAuthenticationException extends AuthenticationException {

    private static final long serialVersionUID = -8778345783456L;

    public InvalidJwtAuthenticationException(String msg) {
        super(msg);
    }
}
