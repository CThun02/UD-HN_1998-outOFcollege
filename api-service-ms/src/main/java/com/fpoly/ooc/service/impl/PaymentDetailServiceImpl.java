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

@Service
public class PaymentDetailServiceImpl implements PaymentService {

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Override
    public List<PaymentDetailResponse> findPaymentDetailByBillId(Long billId) {
        return paymentDetailRepo.findPaymentDetailByBillId(billId);
    }

    @Override
    public PaymentDetail savePaymentDetail(Long billId) throws NotFoundException {
        List<PaymentDetail> lstPaymentDetail = paymentDetailRepo.findAllByBillId(billId);

        if (CollectionUtils.isEmpty(lstPaymentDetail)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        for (PaymentDetail paymentDetail: lstPaymentDetail) {
            paymentDetail.setStatus("Paid");
            paymentDetailRepo.save(paymentDetail);
        }

        return lstPaymentDetail.get(0);
    }
}
