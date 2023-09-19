package com.fpoly.ooc.validation.constraint;

import com.fpoly.ooc.validation.CompareDateNow;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;

public class CompareDateNowConstraint implements ConstraintValidator<CompareDateNow, LocalDateTime> {
    @Override
    public boolean isValid(LocalDateTime value, ConstraintValidatorContext context) {

        LocalDateTime dateNow = LocalDateTime.now();

        return value.isAfter(dateNow);
    }
}
