package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandDAORepository extends JpaRepository<Brand, Long> {
}
