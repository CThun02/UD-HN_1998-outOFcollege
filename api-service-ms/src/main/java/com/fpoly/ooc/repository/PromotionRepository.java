package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    @Query(name = "PromotionProduct.findAllPromotionProduct", nativeQuery = true)
    List<PromotionProductResponse> findAllPromotionProduct(String nameOrCode,
                                                           LocalDateTime startDate,
                                                           LocalDateTime endDate,
                                                           String status);

    Optional<Promotion> findPromotionByPromotionCode(String code);

    @Query("select new com.fpoly.ooc.responce.promotion.PromotionProductResponse(" +
            "p.promotionCode, p.promotionName, CAST(CAST(COUNT(pd.id) AS string) AS integer ), " +
            "p.promotionMethod, p.promotionValue, p.promotionCondition, " +
            "p.startDate, p.endDate, p.status) " +
            "from PromotionProduct pp " +
            "left join Promotion p on pp.promotion.id = p.id " +
            "left join ProductDetail pd on pp.productDetailId.id = pd.id " +
            "group by p.promotionCode, p.promotionName, p.promotionMethod, " +
            "         p.promotionValue, p.promotionCondition, " +
            "         p.startDate, p.endDate, p.status, p.createdAt " +
            "order by p.createdAt desc ")
    List<PromotionProductResponse> findAllPromotionProductNoCondition();

}
