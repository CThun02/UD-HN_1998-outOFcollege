package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.CustomerConditionDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.entity.Role;
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

@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressDetailRepository addressDetailRepository;


    @Override
    public Page<AccountResponce> phanTrang(Integer pageNo, Integer size, Long roleId) {
        return accountRepository.phanTrang(PageRequest.of(pageNo, 5), roleId);
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
        account.setRole(Role.builder().id(1).build());

        Account createAccount = accountRepository.save(account);

//        Address address = Address.builder()
//                .city(request.getCity())
//                .descriptionDetail(request.getDescriptionDetail())
//                .district(request.getDistrict())
//                .ward(request.getWard())
//                .build();
//        Address createAddress = addressRepository.save(address);
//
//        AddressDetail addressDetail = AddressDetail.builder()
//                .accountAddress(createAccount)
//                .addressDetail(createAddress)
//                .build();
//        addressDetailRepository.save(addressDetail);
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

    @Override
    public Page<AccountVoucher> findAccountVoucher(CustomerConditionDTO customerConditionDTO, Pageable pageable) {
        List<AccountVoucher> accountVoucherList = accountRepository.customerAccountList(
                StringUtils.isEmpty(customerConditionDTO.getSearchText())
                        ? null : "%" + customerConditionDTO.getSearchText() + "%", customerConditionDTO.getGender());
        accountVoucherList.forEach((e) -> log.info("Data: " + e));

        return page(accountRepository.customerAccountList(
                StringUtils.isEmpty(customerConditionDTO.getSearchText()) ? null : "%" + customerConditionDTO.getSearchText() + "%",
                customerConditionDTO.getGender()
        ), pageable);
    }

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findById(username).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND)));
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
