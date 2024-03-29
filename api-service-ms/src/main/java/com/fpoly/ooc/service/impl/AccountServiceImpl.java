package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.CustomerConditionDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AccountRepository;
import com.fpoly.ooc.repository.AddressDetailRepository;
import com.fpoly.ooc.repository.AddressRepository;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.responce.account.AccountDetailResponce;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.AccountVoucher;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import com.fpoly.ooc.utilities.UniqueRandomHex;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;
    private AddressRepository addressRepository;
    private AddressDetailRepository addressDetailRepository;
    private AddressDetailService addressDetailService;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, AddressRepository addressRepository, AddressDetailRepository addressDetailRepository, AddressDetailService addressDetailService) {
        this.accountRepository = accountRepository;
        this.addressRepository = addressRepository;
        this.addressDetailRepository = addressDetailRepository;
        this.addressDetailService = addressDetailService;
    }

    @Override
    public List<AccountResponce> getAllByRoleid(Long roleId, String keyword) {
        return accountRepository.getAllByRoleId(roleId, keyword);
    }

    @Override
    public Account save(AccountRequest request) {
        while(true){
            String userName= "user_"+ UniqueRandomHex.generateUniqueRandomHex();
            userName = userName.replace("#", "");
            Optional<Account> check = accountRepository.findById(userName);
            if(check.isEmpty()){
                request.setUsername(userName);
                break;
            }
        };
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
                .fullName(request.getFullName())
                .sdt(request.getNumberPhone())
                .email(request.getEmail())
                .defaultaddress(true)
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
        Account account = accountRepository.findById(username).orElse(null);
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }
        account.setAvatar(request.getImage());
        account.setFullName(request.getFullName());
        account.setEmail(request.getEmail());
        account.setGender(request.getGender());
        account.setPassword(request.getPassword());
        account.setIdNo(request.getIdNo());
        account.setNumberPhone(request.getNumberPhone());
        account.setDob(request.getDob());
        Account createAccount = accountRepository.save(account);
        return createAccount;
    }

    @Override
    public List<AddressDetail> getAddressDetailsByUsername(String username) {
        Account account = accountRepository.findById(username).orElse(null);
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }
        List<AddressDetail> addressDetails = account.getAddAdress();
        List<AddressDetail> addressDetailDTOs = new ArrayList<>();
        return null;
    }

    @Override
    public Account getAccountByEmailOrIdNoOrNumberPhone(Long idRole, String keyWords) {
        return accountRepository.getAccountByEmailOrIdNoOrNumberPhone(idRole, keyWords);
    }


    @Override
    public AccountDetailResponce detail(String username) {
        List<AddressDetail> accountAddressDetails = addressDetailService.getAddressDetailsByUsername(username);
        Account account = accountAddressDetails.get(0).getAccountAddress();
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
                .build();
        accountDetailResponce.setAccountAddress(accountAddressDetails.stream().map(ad -> ad.getAddressDetail()).collect(Collectors.toList()));
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

    @Override
    public Page<AccountVoucher> findAccountVoucher(CustomerConditionDTO customerConditionDTO, Pageable pageable) {
        Boolean gender = true;

        if (customerConditionDTO.getGender().equals("false")) {
            gender = false;
        }

        if (customerConditionDTO.getGender().equals("all")) {
            gender = null;
        }

        return page(accountRepository.customerAccountList(
                StringUtils.isEmpty(customerConditionDTO.getSearchText())
                        ? null : "%" + customerConditionDTO.getSearchText().toLowerCase() + "%",
                gender
        ), pageable);
    }

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findById(username).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND)));
    }

    @Override
    public List<AccountDetailResponce> getAllCustomer(String keyword) {
        List<AddressDetail> accountAddressDetails = addressDetailService.getAllCustomer();
        List<Account> accounts = accountRepository.getAllAccountByRoleId(Long.valueOf(2), "%"+keyword+"%");
        List<AccountDetailResponce> lstAccountDetailResponces = new ArrayList<>();
        for (Account accountGet : accounts) {
            Account account = accountGet;
            AccountDetailResponce accountDetailResponce = AccountDetailResponce.builder()
                    .image(account.getAvatar())
                    .username(account.getUsername())
                    .idNo(account.getIdNo())
                    .fullName(account.getFullName())
                    .dob(account.getDob())
                    .gender(account.getGender())
                    .email(account.getEmail())
                    .numberPhone(account.getNumberPhone())
                    .build();
            for (AddressDetail addressDetail : accountAddressDetails) {
                List<Address> accountAddressList = accountAddressDetails.stream()
                        .filter(ad -> ad.getAccountAddress().equals(account))
                        .map(ad -> ad.getAddressDetail())
                        .collect(Collectors.toList());
                accountDetailResponce.setAccountAddress(accountAddressList);
            }
            lstAccountDetailResponces.add(accountDetailResponce);

        }

        return lstAccountDetailResponces;
    }

    private Page<AccountVoucher> page(List<AccountVoucher> inputList, Pageable pageable) {

        int pageNo = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        int startItem = pageNo * pageSize;

        List<AccountVoucher> outputList;

        if (inputList.size() < startItem) {
            outputList = Collections.emptyList();
        } else {
            int toIndex = Math.min(startItem + pageSize, inputList.size());
            outputList = inputList.subList(startItem, toIndex);
        }

        return new PageImpl<>(outputList, PageRequest.of(pageNo, pageSize), inputList.size());
    }
}
