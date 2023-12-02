package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.repository.ProductImgRepositoryI;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProductImageService implements ProductImageServiceI {

    @Autowired
    private ProductImgRepositoryI repo;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ProductDetailDAORepositoryI productDetailDAORepositoryI;

    @Override
    public ProductImage create(ProductImage productImage) throws JsonProcessingException {

        ProductImage productImageDb = repo.save(productImage);

        if(Objects.nonNull(productImageDb)) {
            String productDetailsJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.findAll());
            String productDetailsShopJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getAllProductDetailShop(
                    null, null, null, "", "", "", "", null,
                    null, null, null, "desc"));
            String bestSellingJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getProductDetailBestSelling());
            String newProductJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getNewProductDetail());
            template.convertAndSend("/topic/productDetail-topic", productDetailsJson);
            template.convertAndSend("/topic/productDetailShop-topic", productDetailsShopJson);
            template.convertAndSend("/topic/bestSellingProduct-topic", bestSellingJson);
            template.convertAndSend("/topic/newProduct-topic", newProductJson);
        }

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
        return repo.findAllProductImages();
    }

    @Override
    public ProductImage getOne(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<ProductImageResponse> getProductImageByProductDetailId(Long productDetailId) {
        return repo.getProductImageByProductDetailId(productDetailId);
    }

    @Override
    public List<ProductImageResponse> getProductImageByProductDetailIds(List<Long> ids) {
        return repo.getProductImageByProductDetailIds(ids);
    }

}
