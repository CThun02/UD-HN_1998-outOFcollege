package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherAccount;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.VoucherAccountRepository;
import com.fpoly.ooc.repository.VoucherHistoryRepository;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.VoucherAccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class VoucherAccountServiceImpl implements VoucherAccountService {

    @Autowired
    private VoucherAccountRepository voucherAccountRepository;

    @Autowired
    private AccountService accountService;

    @Override
    public VoucherAccount saveOrUpdate(VoucherAccountConditionDTO voucherAccountConditionDTO) {

        if (voucherAccountRepository.isCheckUserUsedVoucher(
                voucherAccountConditionDTO.getVoucher().getId(),
                voucherAccountConditionDTO.getUsername())
        ) {
            return null;
        }

        VoucherAccount voucherAccount = getVoucherAccount(voucherAccountConditionDTO);

        return voucherAccountRepository.save(voucherAccount);
    }

    private VoucherAccount getVoucherAccount(VoucherAccountConditionDTO voucherAccountConditionDTO) {
        Account account = accountService.findByUsername(voucherAccountConditionDTO.getUsername());
        Voucher voucher = voucherAccountConditionDTO.getVoucher();

        VoucherAccount voucherAccount = new VoucherAccount();
        voucherAccount.setAccountVoucher(account);
        voucherAccount.setVoucherAccount(voucher);
        voucherAccount.setPercentReduce(voucher.getVoucherMethod().equals("%") ? voucher.getVoucherValue() : null);
        voucherAccount.setMoneyReduce(voucher.getVoucherMethod().equals("%") ? voucher.getVoucherValueMax() : voucher.getVoucherValue());
        return voucherAccount;
    }
}
