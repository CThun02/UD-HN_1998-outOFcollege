package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro);
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro);

}
