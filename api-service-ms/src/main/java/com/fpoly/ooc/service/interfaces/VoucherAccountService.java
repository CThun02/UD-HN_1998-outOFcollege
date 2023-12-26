package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
import com.fpoly.ooc.dto.VoucherAccountUsedDTO;
import com.fpoly.ooc.entity.VoucherAccount;
import com.fpoly.ooc.exception.NotFoundException;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface VoucherAccountService {

    CompletableFuture<VoucherAccount> saveOrUpdate(VoucherAccountConditionDTO voucherAccountConditionDTO);

    VoucherAccount updateAccountUsed(VoucherAccountUsedDTO dto) throws NotFoundException;

    List<VoucherAccount> voucherAccounts();

    List<String> findAccountByVoucherId(Long voucherId);

    VoucherAccount findVoucherAccountByUsernameAndVoucherCode(String username, String voucherCode);

    VoucherAccount updateStatus(VoucherAccount voucherAccount);

}
