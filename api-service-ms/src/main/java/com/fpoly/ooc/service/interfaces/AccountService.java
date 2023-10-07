package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.CustomerConditionDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.responce.account.AccountDetailResponce;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.AccountVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountService {

    Page<AccountResponce> phanTrang(Integer pageNo, Integer size, Long roleId);

    Account save(AccountRequest request);

    Account update(AccountRequest request,String username);

    AccountDetailResponce detail(String userName);

    void remove(String useName);

    List<String> findAllEmailAccount();

    Page<AccountVoucher> findAccountVoucher(CustomerConditionDTO customerConditionDTO, Pageable pageable);

    Account findByUsername(String username);

}