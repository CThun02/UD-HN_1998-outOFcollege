package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandDAORepositoryI extends JpaRepository<Brand, Long> {
}
