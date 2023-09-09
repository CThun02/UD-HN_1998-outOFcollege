package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImgRepositoryI extends JpaRepository<ProductImage, Long> {
}
