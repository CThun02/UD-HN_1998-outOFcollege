package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.entity.Role;
import com.fpoly.ooc.repository.AccountRepository;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;


    @Override
    public Page<AccountResponce> phanTrang(Integer pageNo, Integer size) {
        return accountRepository.phanTrang(PageRequest.of(pageNo,5));
    }

    @Override
    public Account save(AccountRequest request) {
        Account account = Account.builder()
                .username(request.getUsername())
                .avatar(request.getImage())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .gender(request.getGender())
                .password(request.getPassword())
                .idNo(request.getIdNo())
                .numberPhone(request.getNumberPhone())
                .dob(request.getDob())
                .addAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().city(request.getCity()).build()).build()))
                .addAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().district(request.getDistrict()).build()).build()))
                .addAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().ward(request.getWard()).build()).build()))
                .addAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().street(request.getStreet()).build()).build()))
                .addAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().descriptionDetail(request.getDescriptionDetail()).build()).build()))
                .role(Role.builder().id(request.getIdRole()).build())
                .build();
        Account account1=accountRepository.save(account);
        return account1;
    }

    @Override
    public Account update(AccountRequest request,String username) {
        Optional<Account> account = accountRepository.findById(username);
        account.map(o ->{
            o.setAvatar(request.getImage());
            o.setFullName(request.getFullName());
            o.setEmail(request.getEmail());
            o.setGender(request.getGender());
            o.setIdNo(request.getIdNo());
            o.setNumberPhone(request.getNumberPhone());
            o.setDob(request.getDob());
            o.setAddAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().city(request.getCity()).build()).build()));
            o.setAddAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().district(request.getDistrict()).build()).build()));
            o.setAddAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().ward(request.getWard()).build()).build()));
            o.setAddAdress(List.of(AddressDetail.builder().addressDetail(Address.builder().street("").build()).build()));
            return accountRepository.save(o);
        }).orElse(null);
        return null;
    }

    @Override
    public void remove(String useName) {
        accountRepository.deleteById(useName);
    }
}