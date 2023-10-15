package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailResponse> getAll();
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial,
                                                                   Long idShirtTail, Long idSleeve, Long idCollar,
                                                                   Long idColor, Long idSize, Long patternId, Long formId);
    public List<ProductDetailResponse> searchByCodeOrName(String keyWords);
    ProductDetail findById(Long id);
    public Integer updateProductDetailsByCom(Long productId, Long idButton, Long idMaterial,
                                             Long idShirtTail, Long idSleeve, Long idCollar,
                                             Long idColor, Long idSize, String status);
    List<Long> findAllResponseProduct(Long idPromotion);

}
