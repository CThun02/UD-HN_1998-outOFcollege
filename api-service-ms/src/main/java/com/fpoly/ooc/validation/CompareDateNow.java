package com.fpoly.ooc.validation;

import com.fpoly.ooc.validation.constraint.CompareDateNowConstraint;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CompareDateNowConstraint.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CompareDateNow {

    String message() default "Ngày phải lớn hơn ngày hiện tại";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
