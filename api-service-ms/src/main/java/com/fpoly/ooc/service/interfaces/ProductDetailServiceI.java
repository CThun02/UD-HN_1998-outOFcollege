package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.Product.ProductDetailResponse;
import com.fpoly.ooc.responce.Product.ProductDetailSizeResponse;

import java.util.List;

public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public List<ProductDetailResponse> getAll();
    public ProductDetail getOne(Long id);
    public ProductDetailResponse getProductDetail(Long id);
    public List<ProductDetailSizeResponse> getProductDetailColorSizeByIdP(Long id);
    public ProductDetailSizeResponse getProductDetailColorSizeByIdPNIdSize(Long id, Long idSize);
}
