package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.responce.account.AccountDetailResponce;
import com.fpoly.ooc.responce.account.AccountResponce;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccountService {

    Page<AccountResponce> phanTrang(Integer pageNo, Integer size);

    Account save(AccountRequest request);

    Account update(AccountRequest request,String username);

    AccountDetailResponce detail(String userName);

    void remove(String useName);

    List<String> findAllEmailAccount();

}