package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
}
