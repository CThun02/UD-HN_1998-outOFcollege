package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLineRepo extends JpaRepository<Timeline, Long> {

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.timeline.TimeLineResponse(t.id, t.bill.id, t.note, t.status, " +
            "   t.createdAt, t.createdBy, t.bill.billType, p.paymentName, b.status, b.completionDate, b.price, " +
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
            "   pd.id, bd.id, pd.product.productName, bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode," +
            "   pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, " +
            "   pd.shirtTail.shirtTailTypeName, pd.color.colorName, pd.form.formName, pd.pattern.patternName," +
            "   pd.brand.brandName, pd.category.categoryName, bd.status )" +
            "FROM ProductDetail pd " +
            "   JOIN BillDetail bd ON bd.productDetail.id = pd.id " +
            "WHERE bd.bill.id = :billId")
    List<TimelineProductResponse> getTimelineProductByBillId(@Param("billId") Long id);

    @Query("SELECT distinct b.id FROM Timeline t join Bill b on b.id = t.bill.id " +
            " join DeliveryNote d on d.bill.id = b.id where " +
            " (:username is null or b.account.username =:username)" +
            " and (:phoneNumber is null or d.phoneNumber =:phoneNumber)" +
            " and (:email is null or b.account.email =:email) " +
            " and (:status is null or t.status = :status)")
    List<Long> getBillIdByUserNameOrPhoneNumberOrEmail(@Param("username") String username, @Param("phoneNumber") String phoneNumber,
                                                       @Param("email") String email, @Param("status") String status);

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillInfoResponse(b.id, b.billCode,b.transactionCode, b.symbol, b.billType, " +
            "    b.price, b.priceReduce, dn.shipPrice, b.amountPaid, dn.shipDate, pd.payment.paymentName, b.createdAt, " +
            "    add.fullName, add.sdt," +
            "    add.descriptionDetail +  ' ' + add.ward + ' ' + add.district + ' ' + add.city) " +
            "FROM Bill b " +
            "   LEFT JOIN DeliveryNote dn ON b.id = dn.bill.id " +
            "   LEFT JOIN Address add ON add.id = dn.address.id " +
            "   LEFT JOIN PaymentDetail pd ON pd.bill.id = b.id " +
            "WHERE b.id = :billId")
    BillInfoResponse getBillInfoByIdBillId(@Param("billId") Long id);

}

