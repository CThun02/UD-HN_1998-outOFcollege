package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductPromotionResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductServiceI {
    public Product create(Product product);
    public Product update(Product product);
    public Boolean delete(Long id);
    public List<Product> getAll();
    public Product getOne(Long id);
    public Product getOneByCode(String code);
    public ProductTableResponse getProductEdit(Long id);
    public ProductResponse getProductResponseById(Long id);
    public List<ProductTableResponse> getProductFilterByCom(String status, String keywords);
    Page<ProductPromotionResponse> findProductPromotion(Pageable pageable);
    List<Long> findIdsProductsByIdPromotion(Long idPromotion);

}
