package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Discount;
import com.fpoly.ooc.responce.promition.DiscountResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @Query("select new com.fpoly.ooc.responce.promition.DiscountResponse(" +
            "discount.id, discount.discountCode, discount.discountName, discount.startDate, " +
            "discount.endDate, discount.discountValue, discount.discountMaxValue, discount.discountMethod, " +
            "discount.discountCondition) from Discount discount ")
    List<DiscountResponse> findAllDiscount();

    @Query("select new com.fpoly.ooc.responce.promition.DiscountResponse(" +
            "discount.id, discount.discountCode, discount.discountName, discount.startDate, " +
            "discount.endDate, discount.discountValue, discount.discountMaxValue, discount.discountMethod, " +
            "discount.discountCondition) from Discount discount ")
    Page<DiscountResponse> pageAllDiscount(Pageable pageable);

}
