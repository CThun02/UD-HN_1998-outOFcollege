package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.product.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductServiceI {
    public Product create(Product product) throws JsonProcessingException;
    public Product update(Product product) throws JsonProcessingException, NotFoundException;
    public Boolean delete(Long id);
    public List<Product> getAll();
    public Product getOne(Long id);
    public Product getOneByCode(String code);
    public ProductTableResponse getProductEdit(Long id);
    public ProductResponse getProductResponseById(Long id);
    public List<ProductTableResponse> getProductFilterByCom(String status, String keywords);
    List<ProductPromotionResponse> findProductPromotion();
    List<Long> findIdsProductsByIdPromotion(Long idPromotion);

}
