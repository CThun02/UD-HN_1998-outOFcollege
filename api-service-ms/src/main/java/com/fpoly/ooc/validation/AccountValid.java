package com.fpoly.ooc.validation;

import com.fpoly.ooc.validation.constraint.AccountValidConstraint;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = AccountValidConstraint.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface AccountValid {

    String message() default "Phone number is already exist";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};



}
