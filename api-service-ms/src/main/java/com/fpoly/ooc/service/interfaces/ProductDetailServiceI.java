package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.dto.ListQuantityAndPriceRequest;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.dto.QuantityAndPriceDTO;
import com.fpoly.ooc.dto.UpdateQuantityProductDetailDTO;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.product.ProductDetailCondition;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.responce.component.component;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail) throws JsonProcessingException;
    public ProductDetail update(ProductDetail productDetail) throws JsonProcessingException, NotFoundException;
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailDisplayResponse> filterProductDetailsByIdCom(ProductDetailRequest request,
                                                                          BigDecimal minPrice, BigDecimal maxPrice);
    public ProductDetailDisplayResponse getOnePDDisplayById(Long id);
    public List<ProductDetailResponse> searchProductDetail(String keyWords);
    ProductDetail findById(Long id) throws NotFoundException;
    List<Long> findAllIdsResponseProductDetails(Long idPromotion);
    List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO productDetailsDTO);
    public BigDecimal getMaxPricePDByProductId(Long productId);
    Optional<List<ProductDetailShop>> getProductDetailBestSelling();
    Optional<List<ProductDetailShop>> getNewProductDetail();
    public void updateProductDetailsByProductId(Long productId, String status);
    Optional<List<ProductDetailShop>> getAllProductDetailShop(ProductDetailCondition req) throws NotFoundException;
    Optional<BigDecimal> getPriceMax();
    Optional<GetColorAndSizeAndQuantity> getColorAndSize(GetSizeAndColorRequest req) throws NotFoundException;
    Optional<ProductDetailShopResponse> getProductDetailsShop(GetSizeAndColorRequest req) throws NotFoundException;

    Boolean isCheckQuantity(ListQuantityAndPriceRequest dto) throws NotFoundException;
    ProductDetail updateQuantityForBuy(ProductDetail productDetail);

    ProductDetail findProductDetailByIdAndStatus(Long id) throws NotFoundException;

    List<component> getColorProductDetailEdit(Long productDetailId, Long sizeId);
    List<component> getSizeProductDetailEdit(Long productDetailId, Long colorId);

    ProductDetail updateQuantityProductDetail(UpdateQuantityProductDetailDTO req) throws NotFoundException, JsonProcessingException;
}
