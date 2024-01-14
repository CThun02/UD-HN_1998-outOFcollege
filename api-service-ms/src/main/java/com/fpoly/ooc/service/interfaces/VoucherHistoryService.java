package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherHistory;
import com.fpoly.ooc.exception.NotFoundException;

import java.util.List;

import java.math.BigDecimal;

public interface VoucherHistoryService {

    VoucherHistory save(VoucherHistorySaveDTO dto) throws NotFoundException;

    VoucherHistory findHistoryByBillCodeAndStatus(String billCode, String status);

    VoucherHistory saveVoucherHistory(VoucherHistory voucherHistory);

    List<Voucher> findVoucherHistoryByBillCode(String  billCode);
}
