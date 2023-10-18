package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionProductDetailRepository extends JpaRepository<PromotionProduct, Long> {

    @Query("select new java.lang.Boolean((COUNT(*) > 0)) from PromotionProduct pp " +
            "where pp.productDetailId.id = :idProductDetail " +
            "and pp.promotion.id = :idPromotion ")
    Boolean isCheckProductDetailInPromotion(@Param("idProductDetail") Long idProductDetail,
                                            @Param("idPromotion") Long promotion);

    @Query("select new java.lang.Long(pp.id) from PromotionProduct pp " +
            "where pp.productDetailId.id in :idProductDetail " +
            "and pp.promotion.id = :idPromotion ")
    List<Long> findIdPromotionProduct(@Param("idProductDetail") List<Long> idProductDetail,
                                            @Param("idPromotion") Long promotion);

}
