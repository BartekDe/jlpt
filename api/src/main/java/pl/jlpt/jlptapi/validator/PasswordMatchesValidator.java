package pl.jlpt.jlptapi.validator;

import pl.jlpt.jlptapi.annotation.PasswordMatches;
import pl.jlpt.jlptapi.dto.request.UserRegisterDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        UserRegisterDto userRegisterDto = (UserRegisterDto) o;
        return userRegisterDto.getPassword().equals(userRegisterDto.getRepeatPassword());
    }

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {}
}
