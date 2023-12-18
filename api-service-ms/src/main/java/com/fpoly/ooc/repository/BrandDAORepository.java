package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandDAORepository extends JpaRepository<Brand, Long> {
    public Brand findFirstByBrandName(String brandName);
}
