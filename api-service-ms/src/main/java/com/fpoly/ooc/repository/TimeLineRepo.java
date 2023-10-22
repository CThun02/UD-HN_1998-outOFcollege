package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLineRepo extends JpaRepository<Timeline, Long> {

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.timeline.TimeLineResponse(t.id, t.bill.id, t.note, t.status, " +
            "   t.createdAt, t.createdBy, t.bill.billType, p.paymentName, b.status, b.completionDate, b.price, " +
            "   dn.name, dn.phoneNumber, " +
            "   add.descriptionDetail + ' ' + add.ward + ' ' + add.district + ' ' + add.city )" +
            "FROM Timeline t " +
            "   LEFT JOIN Bill b ON t.bill.id = b.id " +
            "   LEFT JOIN BillDetail bd ON bd.bill.id = b.id " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "   LEFT JOIN Address add ON add.id = dn.address.id " +
            "   LEFT JOIN PaymentDetail pd ON pd.bill.id = b.id " +
            "   LEFT JOIN Payment p ON p.id = pd.payment.id " +
            "WHERE b.id = :billId " +
            "ORDER BY t.id")
    List<TimeLineResponse> getTimeLineByBillId(@Param("billId") Long id);

    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimelineProductResponse(" +
            "   pd.product.imgDefault, pd.product.productName, bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode," +
            "   pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName )" +
            "FROM ProductDetail pd " +
            "   JOIN BillDetail bd ON bd.productDetail.id = pd.id " +
            "WHERE bd.bill.id = :billId")
    List<TimelineProductResponse> getTimelineProductByBillId(@Param("billId") Long id);

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillInfoResponse(b.id, b.billCode,b.transactionCode, b.symbol, b.billType, dn.name, dn.phoneNumber, " +
            "    b.price, b.priceReduce, dn.shipPrice, b.amountPaid, dn.shipDate, pd.payment.paymentName, b.createdAt, " +
            "    add.descriptionDetail +  ' ' + add.ward + ' ' + add.district + ' ' + add.city) " +
            "FROM Bill b " +
            "   LEFT JOIN DeliveryNote dn ON b.id = dn.bill.id " +
            "   LEFT JOIN Address add ON add.id = dn.address.id " +
            "   LEFT JOIN PaymentDetail pd ON pd.bill.id = b.id " +
            "WHERE b.id = :billId")
    BillInfoResponse getBillInfoByIdBillId(@Param("billId") Long id);

}

