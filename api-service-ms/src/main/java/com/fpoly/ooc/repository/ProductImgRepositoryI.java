package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImgRepositoryI extends JpaRepository<ProductImage, Long> {
    @Query("SELECT pi.id as id, pi.product as product, pi.color as color," +
            " pi.path as path, pi.status as status FROM ProductImage pi where pi.product.id=?1 and pi.color.id=?2")
    public List<ProductImageResponse> getProductImageByProductIdAndColorId(Long productId, Long colorId);

    @Query("SELECT pi.id as id, pi.product as product, pi.color as color," +
            " pi.path as path, pi.status as status FROM ProductImage pi where pi.product.id=?1")
    public List<ProductImageResponse> getProductImageByProductId(Long productId);

    @Query("SELECT pi.id as id, pi.product as product, pi.color as color," +
            " pi.path as path, pi.status as status FROM ProductImage pi where pi.product.id=?1 and pi.isDefault = true")
    public List<ProductImageResponse> getProductImageDefaultByProductId(Long productId);
}
