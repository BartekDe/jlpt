package pl.jlpt.jlptapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.jlpt.jlptapi.dto.request.UserRegisterDto;
import pl.jlpt.jlptapi.entity.AppUser;
import pl.jlpt.jlptapi.exception.EmailExistsException;
import pl.jlpt.jlptapi.exception.UsernameExistsException;
import pl.jlpt.jlptapi.repository.AppUserRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Component
public class UserRegisterService {

    @Autowired
    EntityManager entityManager;

    @Autowired
    AppUserRepository appUserRepository;

    @Transactional
    public void registerUser(UserRegisterDto userRegisterDto) throws EmailExistsException, UsernameExistsException {

        if (emailExists(userRegisterDto.getEmail())) {
            throw new EmailExistsException();
        }

        if (usernameExists(userRegisterDto.getUsername())) {
            throw new UsernameExistsException();
        }

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String password = passwordEncoder.encode(userRegisterDto.getPassword());
        AppUser newAppUser = new AppUser(
                userRegisterDto.getUsername(),
                userRegisterDto.getEmail(),
                password
        );

        System.out.println(newAppUser);

        entityManager.persist(newAppUser);
    }

    private boolean emailExists(String email) {
        List<AppUser> users = appUserRepository.findByEmail(email);

        if (!users.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    private boolean usernameExists(String username) {
        AppUser user = appUserRepository.findByUsername(username).orElse(null);

        if (user != null) {
            return true;
        } else {
            return false;
        }
    }


}
