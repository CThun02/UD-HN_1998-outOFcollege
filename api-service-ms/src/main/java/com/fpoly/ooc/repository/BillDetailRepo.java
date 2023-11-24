package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepo extends JpaRepository<BillDetail, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.bill.BillResponse(b.id, bd.id, p.id , bd.quantity, " +
            "p.productName, b.price, bd.status, bd.createdAt) " +
            "FROM BillDetail bd " +
            "JOIN bd.bill b " +
            "JOIN bd.productDetail pd " +
            "JOIN pd.product p")
    List<BillResponse> getAllBill();

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.pdf.PdfProduct(pd.id, bd.id, pd.product.productName, " +
            "   bd.quantity, bd.price, pd.size.sizeName, pd.color.colorCode, pd.button.buttonName, pd.collar.collarTypeName, " +
            "   pd.material.materialName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName, pd.color.colorName," +
            "   pd.form.formName, pd.pattern.patternName, pd.brand.brandName, pd.category.categoryName, bd.status," +
            "   b.createdBy, b.price, dn.shipPrice) " +
            "FROM Bill b " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id" +
            "WHERE b.billCode = :billCode ")
    List<TimelineProductResponse> lstProductDT(@Param("billCode") String billCode);

}
