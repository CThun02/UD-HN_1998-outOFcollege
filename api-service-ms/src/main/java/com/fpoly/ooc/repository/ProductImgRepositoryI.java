package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImgRepositoryI extends JpaRepository<ProductImage, Long> {
    @Query("SELECT pi FROM ProductImage pi")
    List<ProductImage> findAllProductImages();

    @Query("SELECT pi.id as id, pi.productDetail.id as productDetailId," +
            "pi.path as path, pi.status as status from ProductImage pi where pi.productDetail.id=?1")
    List<ProductImageResponse>  getProductImageByProductDetailId(Long productDetailId);

    @Query("SELECT pi.id as id, pi.productDetail.id as productDetailId," +
            "pi.path as path, pi.status as status from ProductImage pi where pi.productDetail.id in ?1 " +
            "AND pi.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and pi.productDetail.quantity >= 0 ")
    List<ProductImageResponse>  getProductImageByProductDetailIds(List<Long> ids);
}
