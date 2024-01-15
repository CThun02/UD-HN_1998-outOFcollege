package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.PaymentDetailRepo;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;
import com.fpoly.ooc.service.interfaces.PaymentService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PaymentDetailServiceImpl implements PaymentService {

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Override
    public List<PaymentDetailResponse> findPaymentDetailByBillId(Long billId) {
        return paymentDetailRepo.findPaymentDetailByBillId(billId);
    }

    @Override
    public PaymentDetail savePaymentDetail(Bill bill) throws NotFoundException {
        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        List<PaymentDetail> lstPaymentDetail = paymentDetailRepo.findAllByBillId(bill.getId());

        if (CollectionUtils.isEmpty(lstPaymentDetail)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        for (PaymentDetail paymentDetail: lstPaymentDetail) {
            if ("Online".equalsIgnoreCase(bill.getBillType())) {
                paymentDetail.setPrice(bill.getAmountPaid());
            }
            paymentDetail.setStatus("Paid");
            paymentDetailRepo.save(paymentDetail);
        }

        return lstPaymentDetail.get(0);
    }

    @Override
    public Boolean isBillAlreadyPaid(Long billId) {
        List<PaymentDetail> paymentDetailList = paymentDetailRepo.findAllByBillId(billId);
        for (PaymentDetail paymentDetail: paymentDetailList) {
            if (!"paid".equalsIgnoreCase(paymentDetail.getStatus())) {
                return false;
            }
        }
        return true;
    }
}
