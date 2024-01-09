package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentDetailRepo extends JpaRepository<PaymentDetail, Long> {
 @Query("SELECT new com.fpoly.ooc.responce.payment.PaymentDetailResponse(pd.id, pd.payment.paymentName, pd.price, pd.status) " +
         "FROM PaymentDetail pd " +
         "WHERE pd.bill.id = :id")
    List<PaymentDetailResponse> findPaymentDetailByBillId(@Param("id") Long billId);

    List<PaymentDetail> findAllByBillId(Long billId);

}
