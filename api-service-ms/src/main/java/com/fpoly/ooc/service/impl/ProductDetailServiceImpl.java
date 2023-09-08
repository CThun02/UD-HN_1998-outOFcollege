package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.ProductDetailColorSizeResponse;
import com.fpoly.ooc.responce.ProductDetailResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailServiceImpl implements ProductDetailServiceI {

    @Autowired
    private ProductDetailDAORepositoryI repo;

    @Override
    public ProductDetailResponse getProductDetail(Long id) {
        return repo.getProductDetail(id);
    }

    @Override
    public List<ProductDetailColorSizeResponse> getProductDetailColorSizeByIdPD(Long id) {
        return repo.getProductDetailColorSizeByIdPD(id);
    }

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        return repo.save(productDetail);
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        ProductDetail productDetailCheck = this.getOne(productDetail.getId());
        if(productDetailCheck != null){
            productDetailCheck = repo.save(productDetail);
        }
        return productDetailCheck;
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
    public List<ProductDetail> getAll() {
        return repo.findAll();
    }

    @Override
    public ProductDetail getOne(Long id) {
        Optional<ProductDetail> productDetailOptional = repo.findById(id);
        return productDetailOptional.orElse(null);
    }
}
