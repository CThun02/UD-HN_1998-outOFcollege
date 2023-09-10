package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSizeResponse;

import java.util.List;

public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public List<ProductDetailResponse> getAllProductDetailResponse();
    public ProductDetail getOne(Long id);
    public ProductDetailResponse getProductDetail(Long id);
    List<ProductDetailResponse> findProductDetailByIdDiscount(Long idDiscount);
    public List<ProductDetailSizeResponse> getProductDetailColorSizeByIdP(Long id);
    public ProductDetailSizeResponse getProductDetailColorSizeByIdPNIdSize(Long id, Long idSize);
    public List<ProductDetail> getProductDetailsByIdPro(Long id);
    public ProductDetailResponse getProductDetailByStatus(Long id, String status);
}
