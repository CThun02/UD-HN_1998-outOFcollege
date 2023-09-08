package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.responce.promition.DiscountProductResponse;
import com.fpoly.ooc.responce.promition.DiscountResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountProductRepository extends JpaRepository<DiscountProduct, Long> {

    @Query("select new com.fpoly.ooc.responce.promition.DiscountProductResponse(" +
            "dp.id, d.discountCode, d.discountName, d.startDate, d.endDate, d.discountValue, " +
            "d.discountMaxValue, d.discountMethod, d.discountCondition, " +
            "(select dp from ProductDetail pd join DiscountProduct dp on pd.id = dp.productDetailId.id " +
            "where dp.discountId.id = :idDiscount)) " +
            "from DiscountProduct dp " +
            "join Discount  d on d.id = dp.discountId.id")
    List<DiscountProductResponse> findAllDiscountProduct(@Param("idDiscount") Long idDiscount);

    @Query("select new com.fpoly.ooc.responce.promition.DiscountProductResponse(" +
            "dp.id, d.discountCode, d.discountName, d.startDate, d.endDate, d.discountValue, " +
            "d.discountMaxValue, d.discountMethod, d.discountCondition, " +
            "(select dp from ProductDetail pd join DiscountProduct dp on pd.id = dp.productDetailId.id " +
            "where dp.discountId.id = :idDiscount)) " +
            "from DiscountProduct dp " +
            "join Discount  d on d.id = dp.discountId.id")
    Page<DiscountProductResponse> pageAllDiscountProduct(@Param("idDiscount") Long idDiscount, Pageable pageable);

}
