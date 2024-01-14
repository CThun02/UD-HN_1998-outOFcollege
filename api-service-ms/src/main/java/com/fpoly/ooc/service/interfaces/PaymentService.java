package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;

import java.util.List;

public interface PaymentService {

    List<PaymentDetailResponse> findPaymentDetailByBillId(Long billId);

    PaymentDetail savePaymentDetail(Bill bill) throws NotFoundException;

    Boolean isBillAlreadyPaid(Long billId);

}
