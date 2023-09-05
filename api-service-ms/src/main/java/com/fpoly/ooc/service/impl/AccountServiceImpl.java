package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.repository.interfaces.AccountRepository;
import com.fpoly.ooc.request.AccountRequest;
import com.fpoly.ooc.responce.AccountResponce;
import com.fpoly.ooc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Page<AccountResponce> phanTrang(Integer pageNo, Integer size) {
        return accountRepository.phanTrang(PageRequest.of(pageNo, 5));
    }

    @Override
    public Account save(AccountRequest request) {
        Account account = Account.builder()
                .userName(request.getUserName())
                .fullName(request.getFullName())
                .cccd(request.getIdNo())
                .numberPhone(request.getNumberPhone())
                .email(request.getEmail())
                .dob(request.getDob())
                .addressDetail(AddressDetail.builder().address(Address.builder().city(request.getCity()).build()).build())
                .addressDetail(AddressDetail.builder().address(Address.builder().distrit(request.getDistrit()).build()).build())
                .addressDetail(AddressDetail.builder().address(Address.builder().ward(request.getWard()).build()).build())
                .addressDetail(AddressDetail.builder().address(Address.builder().street(request.getStreet()).build()).build())
                .addressDetail(AddressDetail.builder().address(Address.builder().descriptionDetail(request.getDescriptionDetail()).build()).build())
                .avatar(request.getImage())
                .build();

        return account;
    }

    @Override
    public Account update(AccountRequest request, String userName) {
        Optional<Account> account = accountRepository.findById(userName);
        account.map(o -> {
            o.setFullName(request.getFullName());
            o.setCccd(request.getIdNo());
            o.setNumberPhone(request.getNumberPhone());
            o.setEmail(request.getEmail());
            o.setDob(request.getDob());
            o.setAddressDetail(AddressDetail.builder().address(Address.builder().city(request.getCity()).build()).build());
            o.setAddressDetail(AddressDetail.builder().address(Address.builder().distrit(request.getDistrit()).build()).build());
            o.setAddressDetail(AddressDetail.builder().address(Address.builder().ward(request.getWard()).build()).build());
            o.setAddressDetail(AddressDetail.builder().address(Address.builder().street(request.getStreet()).build()).build());
            o.setAddressDetail(AddressDetail.builder().address(Address.builder().descriptionDetail(request.getDescriptionDetail()).build()).build());
            o.setAvatar(request.getImage());
            return accountRepository.save(o);
        }).orElse(null);
        return null;
    }

    @Override
    public void remove(String userName) {
        accountRepository.deleteById(userName);
    }
}
