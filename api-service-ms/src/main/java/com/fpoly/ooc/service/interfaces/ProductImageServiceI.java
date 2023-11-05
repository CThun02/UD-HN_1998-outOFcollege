package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.responce.product.ProductImageResponse;

import java.util.List;

public interface ProductImageServiceI {
    public ProductImage create(ProductImage color);
    public ProductImage update(ProductImage color);
    public void delete(ProductImage productImage);
    public List<ProductImage> getAll();
    public ProductImage getOne(Long id);
    List<ProductImageResponse>  getProductImageByProductDetailId(Long productDetailId);

    List<ProductImageResponse>  getProductImageByProductDetailIds(List<Long> ids);
}
