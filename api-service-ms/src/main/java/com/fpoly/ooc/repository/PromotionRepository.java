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
}
