package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.entity.Role;
import com.fpoly.ooc.repository.AccountRepository;
import com.fpoly.ooc.repository.AddressDetailRepository;
import com.fpoly.ooc.repository.AddressRepository;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.responce.account.AccountDetailResponce;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressDetailRepository addressDetailRepository;

    @Override
    public Page<AccountResponce> phanTrang(Integer pageNo, Integer size) {
        return accountRepository.phanTrang(PageRequest.of(pageNo, 5));
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
                .role(Role.builder().id(request.getIdRole()).build())
                .build();

        Account createAccount = accountRepository.save(account);

        Address address = Address.builder()
                .city(request.getCity())
                .descriptionDetail(request.getDescriptionDetail())
                .district(request.getDistrict())
                .ward(request.getWard())
                .build();
        Address createAddress = addressRepository.save(address);

        AddressDetail addressDetail = AddressDetail.builder()
                .accountAddress(createAccount)
                .addressDetail(createAddress)
                .build();
        addressDetailRepository.save(addressDetail);
        return createAccount;
    }

    @Override
    public Account update(AccountRequest request, String username) {
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
                .role(Role.builder().id(request.getIdRole()).build())
                .build();

        Account createAccount = accountRepository.save(account);

        Address address = Address.builder()
                .city(request.getCity())
                .descriptionDetail(request.getDescriptionDetail())
                .district(request.getDistrict())
                .ward(request.getWard())
                .build();
        Address createAddress = addressRepository.save(address);

        AddressDetail addressDetail = AddressDetail.builder()
                .accountAddress(createAccount)
                .addressDetail(createAddress)
                .build();
        addressDetailRepository.save(addressDetail);
        return createAccount;
    }

    @Override
    public AccountDetailResponce detail(String username) {
        Account account = accountRepository.findById(username).orElse(null);
        if (account == null) {
            throw new IllegalArgumentException("username không tồn tại");
        }
        AccountDetailResponce accountDetailResponce = AccountDetailResponce.builder()
                .image(account.getAvatar())
                .username(account.getUsername())
                .idNo(account.getIdNo())
                .fullName(account.getFullName())
                .dob(account.getDob())
                .gender(account.getGender())
                .email(account.getEmail())
                .numberPhone(account.getNumberPhone())
                .descriptionDetail(account.getAddAdress().get(0).getAddressDetail().getDescriptionDetail())
                .city(account.getAddAdress().get(0).getAddressDetail().getCity())
                .district(account.getAddAdress().get(0).getAddressDetail().getDistrict())
                .ward(account.getAddAdress().get(0).getAddressDetail().getWard())
                .build();
        return accountDetailResponce;

    }

    @Override
    public void remove(String useName) {
        accountRepository.deleteById(useName);
    }

    @Override
    public List<String> findAllEmailAccount() {
        return accountRepository.emailAccountList();
    }
}
 