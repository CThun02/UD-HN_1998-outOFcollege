package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.TimeLine;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLineRepo extends JpaRepository<TimeLine, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimeLineResponse(t.id, t.bill.id, t.note, t.status, " +
            "   t.createdAt, t.createdBy, t.bill.billType, p.paymentName, b.status, b.completionDate, b.price, " +
            "   acc.fullName, acc.numberPhone, acc.email, " +
            "   add.descriptionDetail +  ' ' + add.ward + ' ' + add.district + ' ' + add.city )" +
            "FROM TimeLine t JOIN Bill b ON t.bill.id = b.id " +
            "   JOIN BillDetail bd ON bd.bill.id = b.id " +
            "   JOIN Account acc ON acc.username = b.account.username " +
            "   JOIN AddressDetail ad ON ad.accountAddress.username = acc.username " +
            "   JOIN Address add ON add.id = ad.addressDetail.id " +
            "   JOIN PaymentDetail pd ON pd.bill.id = b.id " +
            "   JOIN Payment p ON p.id = pd.payment.id " +
            "WHERE b.id = :billId " +
            "ORDER BY t.id")
    List<TimeLineResponse> getTimeLineByBillId(@Param("billId") Long id);

    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimelineProductResponse(" +
            "   pd.product.imgDefault, pd.product.productName, bd.quantity, bd.price, pd.size.sizeName, pd.color.colorName," +
            "   pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName )" +
            "FROM ProductDetail pd " +
            "   JOIN BillDetail bd ON bd.productDetail.id = pd.id " +
            "WHERE bd.bill.id = :billId")
    List<TimelineProductResponse> getTimelineProductByBillId(@Param("billId") Long id);

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillInfoResponse(b.id, b.billType, ac.fullName, ac.numberPhone, " +
            "   ac.email, add.descriptionDetail +  ' ' + add.ward + ' ' + add.district + ' ' + add.city) " +
            "FROM Bill b " +
            "   JOIN Account ac ON ac.username = b.account.username " +
            "   JOIN AddressDetail ad ON ad.accountAddress.username = ac.username " +
            "   JOIN Address add ON add.id = ad.addressDetail.id " +
            "WHERE b.id = :billId")
    BillInfoResponse getBillInfoByIdBillId(@Param("billId") Long id);

}

