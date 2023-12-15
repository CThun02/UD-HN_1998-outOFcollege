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

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.timeline.TimeLineResponse( t.id, t.bill.id, t.note, t.status, " +
            "   t.createdAt, t.createdBy, t.bill.billType, b.status, b.completionDate, b.price, " +
            "   add.descriptionDetail + ' ' + add.ward + ' ' + add.district + ' ' + add.city )" +
            "FROM Timeline t " +
            "   LEFT JOIN Bill b ON t.bill.id = b.id " +
            "   LEFT JOIN BillDetail bd ON bd.bill.id = b.id " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "   LEFT JOIN Address add ON add.id = dn.address.id " +
            "WHERE b.id = :billId " +
            "ORDER BY t.id")
    List<TimeLineResponse> getTimeLineByBillId(@Param("billId") Long id);

    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimelineProductResponse(" +
            "   bd.bill.id,  bd.bill.billCode, pd.id, bd.id, pd.product.productCode," +
            "   pd.product.productName,pd.quantity, bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode," +
            "   pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, " +
            "   pd.shirtTail.shirtTailTypeName, pd.color.colorName, pd.form.formName, pd.pattern.patternName," +
            "   pd.brand.brandName, pd.category.categoryName, bd.status )" +
            "FROM ProductDetail pd " +
            "   JOIN BillDetail bd ON bd.productDetail.id = pd.id " +
            "WHERE bd.bill.id = :billId")
    List<TimelineProductResponse> getTimelineProductByBillId(@Param("billId") Long id);


    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimelineProductResponse(" +
            "   b.id, b.billCode, pd.id, bd.id, pd.product.productCode, pd.product.productName, pd.quantity, " +
            "   bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode, " +
            "   pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, " +
            "   pd.shirtTail.shirtTailTypeName, pd.color.colorName, pd.form.formName, pd.pattern.patternName," +
            "   pd.brand.brandName, pd.category.categoryName, bd.status) " +
            "FROM Bill b  " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN Timeline tl ON tl.bill.id = b.id " +
            "   LEFT JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE  (:username IS NULL OR b.account.username = :username) " +
            "   AND (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE :status) " +
            "   AND (:createdBy IS NULL OR b.createdBy LIKE :createdBy AND b.status not like 'Cancel') " +
            "   GROUP BY pd.id, bd.id, pd.product.productCode, pd.product.productName, bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode, " +
            "              pd.button.buttonName, pd.collar.collarTypeName, pd.material.materialName, pd.sleeve.sleeveName, " +
            "              pd.shirtTail.shirtTailTypeName, pd.color.colorName, pd.form.formName, pd.pattern.patternName, " +
            "              pd.brand.brandName, pd.category.categoryName,pd.quantity, bd.status, b.billCode, b.symbol, b.status,b.createdAt, b.id " +
            "HAVING (:symbol IS NULL OR (b.symbol like :symbol and b.status not like 'Cancel' " +
            "  AND (:count IS NULL OR COUNT(tl.id) = :count))) " +
            "ORDER BY b.createdAt DESC ")
    List<TimelineProductResponse> getAllBillByClient(
            @Param("username") String username,
            @Param("billCode") String billCode,
            @Param("status") String status,
            @Param("symbol") String symbol,
            @Param("count") Integer count,
            @Param("createdBy") String createdBy);

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillInfoResponse(b.id, b.billCode,b.transactionCode, b.symbol, b.billType, " +
            "    b.price, b.priceReduce, dn.shipPrice, b.amountPaid, dn.shipDate, b.createdAt, " +
            "    add.fullName, add.sdt, add.id, " +
            "    add.descriptionDetail, add.ward, add.district, add.city, b.status, vh.priceReduce) " +
            "FROM Bill b " +
            "   LEFT JOIN DeliveryNote dn ON b.id = dn.bill.id " +
            "   LEFT JOIN Address add ON add.id = dn.address.id " +
            "   LEFT JOIN VoucherHistory vh ON vh.bill.id = b.id " +
            "WHERE b.id = :billId")
    BillInfoResponse getBillInfoByIdBillId(@Param("billId") Long id);

    @Query("SELECT NEW java.lang.Long(COUNT(timline)) FROM Timeline timline where timline.bill.id = ?1")
    Long getCountTimelineByBillId(Long billId);
}

