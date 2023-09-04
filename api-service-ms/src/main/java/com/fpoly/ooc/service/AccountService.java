package com.fpoly.ooc.service;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.request.AccountRequest;
import com.fpoly.ooc.responce.AccountResponce;
import org.springframework.data.domain.Page;

public interface AccountService {

    Page<AccountResponce> phanTrang(Integer pageNo, Integer size);

    Account save(AccountRequest request);

    Account update(AccountRequest request, String userName);

    void remove(String userName);
}
