package com.fpoly.ooc.validation.constraint;

import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.validation.AccountValid;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AccountValidConstraint implements ConstraintValidator<AccountValid, String> {

    private AccountService accountService;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if(StringUtils.isEmpty(value) || StringUtils.isBlank(value)) {
            return true;
        }

        return accountService.findAccountByLogin(value, null) == null;
    }
}
