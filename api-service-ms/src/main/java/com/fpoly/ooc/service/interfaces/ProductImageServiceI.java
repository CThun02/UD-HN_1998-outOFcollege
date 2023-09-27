package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;

import java.util.List;

public interface ProductImageServiceI {
    public ProductImage create(ProductImage color);
    public ProductImage update(ProductImage color);
    public void delete(ProductImage productImage);
    public List<ProductImage> getAll();
    public ProductImage getOne(Long id);
    public List<ProductImage> getProductImagesByProduct(Product product);
    public ProductImage getProductImagesByProductAndPath(Product product, String path);

}
