package com.fpoly.ooc.util;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.exception.NotFoundException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Data
@Slf4j
public class CommonUtils {

    public static Account isValidArraysAccount(List<Account> accounts) {
        Account account = null;

        if (CollectionUtils.isEmpty(accounts)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        if(accounts.size() > 1) {
            log.warn("accounts than 1: " + accounts.size());
            account = accounts.get(0);
        }

        if(accounts.size() == 1) {
            account = accounts.get(0);
        }

        if(Objects.isNull(account)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        return account;
    }

}