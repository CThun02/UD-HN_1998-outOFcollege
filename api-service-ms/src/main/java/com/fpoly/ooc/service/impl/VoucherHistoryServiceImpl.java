package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.entity.VoucherHistory;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.VoucherHistoryRepository;
import com.fpoly.ooc.repository.VoucherRepository;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.VoucherHistoryService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class VoucherHistoryServiceImpl implements VoucherHistoryService {

    @Autowired
    private VoucherService voucherService;


    @Autowired
    private VoucherHistoryRepository voucherHistoryRepository;

    @Override
    public VoucherHistory save(VoucherHistorySaveDTO dto) throws NotFoundException {
        BillService billService = new BillServiceImpl();
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

    @Override
    public VoucherHistory findHistoryByBillCodeAndStatus(String billCode, String status) {
        return voucherHistoryRepository.findVoucherHistoryByBill_BillCodeAndStatus(billCode, status);
    }

    @Override
    public VoucherHistory saveVoucherHistory(VoucherHistory voucherHistory) {
        return voucherHistoryRepository.save(voucherHistory);
    }

    @Override
    public List<Voucher> findVoucherHistoryByBillCode(String billCode) {
        List<VoucherHistory> voucherHistories = voucherHistoryRepository.findVoucherHistoryByBill_BillCode(billCode);
        List<Voucher> vouchers = new ArrayList<>();
        for (int i = 0; i < voucherHistories.size(); i++) {
            Voucher voucher = voucherService.getVoucherByCode(voucherHistories.get(i).getVoucherCode());
            if(!Objects.isNull(voucher)){
                voucher.setStatus(voucherHistories.get(i).getStatus());
                vouchers.add(voucher);
            }
        }
        return vouchers;
    }
}
