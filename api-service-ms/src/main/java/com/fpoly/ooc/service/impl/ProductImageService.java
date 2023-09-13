package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.repository.ProductImgRepositoryI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageService implements ProductImageServiceI {

    @Autowired
    private ProductImgRepositoryI repo;

    @Override
    public ProductImage create(ProductImage productImage) {
        return repo.save(productImage);
    }

    @Override
    public ProductImage update(ProductImage productImage) {
        return repo.save(productImage);
    }

    @Override
    public void delete(ProductImage productImage) {
        repo.delete(productImage);
    }

    @Override
    public List<ProductImage> getAll() {
        return null;
    }

    @Override
    public ProductImage getOne(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<ProductImage> getProductImagesByProduct(Product product){
        return repo.findProductImagesByProduct(product);
    }

    @Override
    public ProductImage getProductImagesByProductAndPath(Product product, String path) {
        return repo.findProductImagesByProductAndAndPath(product, path);
    }

}
