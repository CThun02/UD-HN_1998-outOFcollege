package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BillDetailRepo extends JpaRepository<BillDetail, Long> {


    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.timeline.TimelineProductResponse(b.id, b.billCode, pd.id, bd.id, pd.product.productCode, pd.product.productName, " +
            "   pd.quantity ,bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode, pd.button.buttonName, pd.collar.collarTypeName, " +
            "   pd.material.materialName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName, pd.color.colorName," +
            "   pd.form.formName, pd.pattern.patternName, pd.brand.brandName, pd.category.categoryName, bd.status) " +
            "FROM Bill b " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE b.billCode = :billCode ")
    List<TimelineProductResponse> lstProductDT(@Param("billCode") String billCode);

    List<BillDetail> findBillDetailByBill_Id(Long id);

    @Query("SELECT sum(bd.price * bd.quantity) from BillDetail bd where bd.bill.billCode " +
            "like ?1 and (bd.status is null or (bd.status not like 'CANCEL' " +
            "and bd.status not like 'RETURNS' ))")
    BigDecimal getTotalPriceByBillCode(String billCode);

    List<BillDetail> findBillDetailByBill_BillCode(String billCode);

    @Query("Select bd from BillDetail bd where bd.productDetail.id = ?1 and bd.bill.billCode like ?2")
    List<BillDetail> findBillDetailsByProductDetailIdAndBillCode(Long productDetailId, String billCode);

}
