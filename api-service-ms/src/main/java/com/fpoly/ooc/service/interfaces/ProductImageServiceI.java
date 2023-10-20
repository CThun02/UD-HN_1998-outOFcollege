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
    public List<ProductImageResponse> getProductImageByProductIdAndColorId(Long productId, Long colorId);
    public List<ProductImageResponse> getProductImageByProductId(Long productId);
    public List<ProductImageResponse> getProductImageDefaultByProductId(Long productId);

}
