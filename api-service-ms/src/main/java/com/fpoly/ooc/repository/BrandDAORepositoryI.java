package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.responce.BrandResponce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandDAORepositoryI extends JpaRepository<Brand, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.BrandResponce(b.id, b.brandName, b.status)" +
            " from Brand b")
    List<BrandResponce> getAll();
}
