package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductDetail;

import java.util.List;

public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public List<ProductDetail> getAll();
    public ProductDetail getOne(Long id);
}
