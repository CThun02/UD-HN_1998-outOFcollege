package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;

import java.math.BigDecimal;
import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailDisplayResponse> filterProductDetailsByIdCom(ProductDetailRequest request,
                                                                          BigDecimal minPrice, BigDecimal maxPrice);
    public List<ProductDetailResponse> searchProductDetail(String keyWords);
    ProductDetail findById(Long id);
    List<Long> findAllIdsResponseProductDetails(Long idPromotion);
    List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO productDetailsDTO);
    public BigDecimal getMaxPricePDByProductId(Long productId);

}
