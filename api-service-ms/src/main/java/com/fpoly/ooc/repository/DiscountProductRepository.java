package com.fpoly.ooc.repository;

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

    List<DiscountProduct> findDiscountProductByDiscountIdId(Long idDiscount);

}
