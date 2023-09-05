package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.DiscountProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountProductRepository extends JpaRepository<DiscountProduct, Long> {
}
