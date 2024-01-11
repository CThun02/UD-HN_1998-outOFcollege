package com.fpoly.ooc.repository;

import com.fpoly.ooc.dto.PromotionProductDetailDTO;
import com.fpoly.ooc.entity.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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

    @Query("""
        select new com.fpoly.ooc.dto.PromotionProductDetailDTO(p.promotionValue, p.promotionMethod,
               case
                   when p.promotionMethod = '%'
                   then p.promotionValue * pd.price / 100
                   else p.promotionValue end)
            from PromotionProduct ppd
            inner join ProductDetail pd on ppd.productDetailId.id = pd.id
            inner join Promotion p on ppd.promotion.id = p.id
            where pd.id in (?1)
            and ?2 between p.startDate and p.endDate
            and p.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE
        group by p.promotionValue, p.promotionMethod, pd.price
        order by case
                   when p.promotionMethod = '%'
                   then p.promotionValue * pd.price / 100
                   else p.promotionValue end
                   desc
    """)
    List<PromotionProductDetailDTO> findPromotionProductDetailByProductDetailId(List<Long> productDetailIdList, LocalDateTime dateNow);


}
