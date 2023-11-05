package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherHistory;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.VoucherHistoryService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class VoucherHistoryServiceImpl implements VoucherHistoryService {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private BillService billService;

    @Override
    public VoucherHistory save(VoucherHistorySaveDTO dto) {

        if(voucherService.isCheckTimeUse(dto.getVoucherCode(), null)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_END_OF_USE));
        }

        Bill bill = billService.findBillByBillId(dto.getIdBill());

        VoucherHistory voucherHistory = new VoucherHistory();
        voucherHistory.setVoucherCode(dto.getVoucherCode());
        voucherHistory.setPriceReduce(dto.getPriceReduce());
        voucherHistory.setBill(bill);

        return null;
    }
}
