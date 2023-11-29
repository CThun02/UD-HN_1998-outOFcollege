package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductReturn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductReturnRepository extends JpaRepository<ProductReturn, Long> {
}
