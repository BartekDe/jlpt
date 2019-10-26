package pl.jlpt.jlptapi.validation;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.jlpt.jlptapi.dto.request.UserRegisterDto;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRegisterTest {
    @Autowired
    private Validator validator;

    @Test
    public void shouldValidateRegistrationRequest() {
        // given
        String password = "passwd";
        String email = "valid.email@email.com";
        String username = "uzytkownik1";
        UserRegisterDto dto = new UserRegisterDto();
        dto.setPassword(password);
        dto.setEmail(email);
        dto.setUsername(username);

        // when
        Set<ConstraintViolation<UserRegisterDto>> violations = validator.validate(dto);

        // then
        Assert.assertTrue(violations.isEmpty());
    }
}
