package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
import com.fpoly.ooc.dto.VoucherAccountUsedDTO;
import com.fpoly.ooc.dto.VoucherHistoryConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherAccount;

import java.util.List;

public interface VoucherAccountService {

    VoucherAccount saveOrUpdate(VoucherAccountConditionDTO voucherAccountConditionDTO);

    VoucherAccount updateAccountUsed(VoucherAccountUsedDTO dto);

    List<VoucherAccount> voucherAccounts();

    List<String> findAccountByVoucherId(Long voucherId);

}
