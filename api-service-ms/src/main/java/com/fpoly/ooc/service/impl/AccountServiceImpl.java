package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.repository.interfaces.AccountRepository;
import com.fpoly.ooc.request.AccountRequest;
import com.fpoly.ooc.responce.AccountResponce;
import com.fpoly.ooc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Page<AccountResponce> phanTrang(Integer pageNo, Integer size) {
        return accountRepository.phanTrang(PageRequest.of(pageNo, 5));
    }

    @Override
    public Account save(AccountRequest request) {
        return null;
    }

    @Override
    public Account update(AccountRequest request, String userName) {
        return null;
    }

    @Override
    public void remove(String userName) {

    }
}
