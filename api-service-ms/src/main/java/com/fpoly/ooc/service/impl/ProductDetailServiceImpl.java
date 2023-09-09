package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.responce.Product.ProductDetailColorResponse;
import com.fpoly.ooc.responce.Product.ProductDetailResponse;
import com.fpoly.ooc.responce.Product.ProductDetailSizeResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<ProductDetailSizeResponse> getProductDetailColorSizeByIdP(Long id) {
        List<Size> sizes = repo.getSizeIdByProductId(id);
        List<ProductDetailSizeResponse> productDetailSizeResponses = new ArrayList<>();
        for (Size size: sizes){
            List<ProductDetailColorResponse> productDetailColorResponse = repo.getProductDetailColorSizeByIdPAndSizeId(id, size.getId());
            ProductDetailSizeResponse productDetailSizeResponse = ProductDetailSizeResponse.builder().sizeId(size.getId()).sizeName(size.getSizeName())
                    .listColor(productDetailColorResponse).build();
            productDetailSizeResponses.add(productDetailSizeResponse);
        }
        return productDetailSizeResponses;
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
