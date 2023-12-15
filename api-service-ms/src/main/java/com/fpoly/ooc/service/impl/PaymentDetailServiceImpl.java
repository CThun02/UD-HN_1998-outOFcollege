package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.repository.PaymentDetailRepo;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;
import com.fpoly.ooc.service.interfaces.PaymentService;
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
}
