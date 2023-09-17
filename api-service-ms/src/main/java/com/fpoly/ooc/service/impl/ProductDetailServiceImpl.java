package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailServiceI {
    @Autowired
    private ProductDetailDAORepositoryI repo;

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        return repo.save(productDetail);
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        ProductDetail productDetailtCheck = this.getOne(productDetail.getId());
        if(productDetailtCheck != null){
            productDetailtCheck = repo.save(productDetail);
        }
        return productDetailtCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ProductDetail productDetail = this.getOne(id);
        if(productDetail!=null){
            repo.delete(productDetail);
            deleted = true;
        }
        return deleted;
    }
    @Override
    public ProductDetail getOne(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro) {
        return repo.getProductDetailsByIdProduct(idPro);
    }

    @Override
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro) {
        return repo.getProductDetailsTableByIdProduct(idPro);
    }
}
