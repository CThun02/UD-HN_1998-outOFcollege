package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImgRepositoryI extends JpaRepository<ProductImage, Long> {
    public List<ProductImage> findProductImagesByProduct(Product product);
    public ProductImage findProductImagesByProductAndAndPath(Product product, String path);

}
