package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.responce.AccountResponce;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImgRepositoryI extends JpaRepository<ProductImage, Long> {
}
