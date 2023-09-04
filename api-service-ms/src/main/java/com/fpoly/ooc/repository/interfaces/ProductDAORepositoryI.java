package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDAORepositoryI extends JpaRepository<Product, Long> {
}
