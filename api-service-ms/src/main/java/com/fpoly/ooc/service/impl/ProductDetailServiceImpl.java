package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailServiceImpl implements ProductDetailServiceI {
    private ProductDetailDAORepositoryI repo;
    private ProductImageServiceI productImageService;

    @Autowired
    public ProductDetailServiceImpl(ProductDetailDAORepositoryI repo, ProductImageServiceI productImageService) {
        this.repo = repo;
        this.productImageService = productImageService;
    }

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        return repo.save(productDetail);
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        ProductDetail productDetailtCheck = this.getOne(productDetail.getId());
        if (productDetailtCheck != null) {
            productDetailtCheck = repo.save(productDetail);
        }
        return productDetailtCheck;
    }

    @Override
    public Boolean delete(Long id) {
        boolean deleted = false;
        ProductDetail productDetail = this.getOne(id);
        if (productDetail != null) {
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
    public List<ProductDetailDisplayResponse> filterProductDetailsByIdCom(ProductDetailRequest request,
                                                                          BigDecimal minPrice, BigDecimal maxPrice) {
        List <ProductDetailDisplayResponse> productDetailDisplayResponses = new ArrayList<>();
        List<ProductDetailResponse> productDetailResponses = repo.filterProductDetailsByIdCom(request.getProductId(),
                request.getButtonId(), request.getMaterialId(),
                request.getShirtTailId(), request.getSleeveId(), request.getCollarId(), request.getColorId(),
                request.getSizeId(), request.getPatternId(), request.getFormId(), request.getBrandId(), request.getCategoryId(),
                minPrice, maxPrice);
        for(int i=0; i<productDetailResponses.size(); i++){
            ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponses.get(i));
            List<ProductImageResponse> productImageResponses = productImageService.
                    getProductImageByProductDetailId(productDetailDisplayResponse.getId());
            productDetailDisplayResponse.setProductImageResponse(productImageResponses);
            productDetailDisplayResponses.add(productDetailDisplayResponse);
        }
        return  productDetailDisplayResponses;
    }

    @Override
    public List<ProductDetailResponse> searchProductDetail(String keyWords) {
        keyWords = "%" + keyWords + "%";
        List<ProductDetailResponse> values = repo.searchProductDetail(keyWords);
        return values;
    }

    public ProductDetail findById(Long id) {
        ProductDetail productDetail = repo.findById(id).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.PRODUCT_DETAIL_NOT_FOUND)));
        return productDetail;
    }

    @Override
    public BigDecimal getMaxPricePDByProductId(Long productId) {
        return repo.getMaxPricePDByProductId(productId);
    }

    @Override
    public List<Long> findAllIdsResponseProductDetails(Long idPromotion) {
        return repo.findAllByIdPromotion(idPromotion);
    }

    @Override
    public List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO dto) {
        return repo.getProductDetailsTableByConditionDTO(
                dto.getIdProducts(), dto.getIdButtons(), dto.getIdMaterials(),
                dto.getIdCollars(), dto.getIdSleeves(), dto.getIdShirtTails(),
                dto.getIdSizes(), dto.getIdColors(),
                StringUtils.isEmpty(dto.getSearchText()) ? null : "%" + dto.getSearchText() + "%"
        );
    }

}
