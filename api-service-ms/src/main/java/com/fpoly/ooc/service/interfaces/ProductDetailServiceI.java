package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;

import java.math.BigDecimal;
import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailResponse> getAll();
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial,
                                                                   Long idShirtTail, Long idSleeve, Long idCollar,
                                                                   Long idColor, Long idSize, Long patternId, Long formId,
                                                                   BigDecimal minPrice, BigDecimal maxPrice);
    public List<ProductDetailResponse> searchByCodeOrName(String keyWords);
    ProductDetail findById(Long id);
    List<Long> findAllIdsResponseProductDetails(Long idPromotion);
    List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO productDetailsDTO);
    public Integer updateProductDetailsByCom(Long productId, Long idButton, Long idMaterial,
                                             Long idShirtTail, Long idSleeve, Long idCollar,
                                             Long idColor, Long idSize, String status);
    public BigDecimal getMaxPricePDByProductId(Long productId);

}
