package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.common.Commons;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.request.product.ProductDetailCondition;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import com.fpoly.ooc.util.PageUltil;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailServiceI {
    private ProductDetailDAORepositoryI repo;
    private ProductImageServiceI productImageService;
    private ColorServiceI colorServiceI;
    private SizeServiceI sizeServiceI;

    @Autowired
    public ProductDetailServiceImpl(ProductDetailDAORepositoryI repo, ProductImageServiceI productImageService,
                                    ColorServiceI colorServiceI, SizeServiceI sizeServiceI) {
        this.repo = repo;
        this.productImageService = productImageService;
        this.colorServiceI = colorServiceI;
        this.sizeServiceI = sizeServiceI;
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
        return repo.findById(id).orElse(null);
    }

    @Override
    public ProductDetailDisplayResponse getOnePDDisplayById(Long id) {
        ProductDetailResponse productDetailResponse = repo.getProductDetailResponseById(id);
        ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponse,
                productImageService.getProductImageByProductDetailId(productDetailResponse.getId()));
        return  productDetailDisplayResponse;
    }

    @Override
    public List<ProductDetailDisplayResponse> filterProductDetailsByIdCom(ProductDetailRequest request,
                                                                          BigDecimal minPrice, BigDecimal maxPrice) {
        List<ProductDetailDisplayResponse> productDetailDisplayResponses = new ArrayList<>();
        List<ProductDetailResponse> productDetailResponses = repo.filterProductDetailsByIdCom(request.getProductId(),
                request.getButtonId(), request.getMaterialId(),
                request.getShirtTailId(), request.getSleeveId(), request.getCollarId(), request.getColorId(),
                request.getSizeId(), request.getPatternId(), request.getFormId(), request.getBrandId(), request.getCategoryId(),
                minPrice, maxPrice);
        for (int i = 0; i < productDetailResponses.size(); i++) {
            ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponses.get(i),
                    productImageService.getProductImageByProductDetailId(productDetailResponses.get(i).getId()));
            productDetailDisplayResponses.add(productDetailDisplayResponse);
        }
        return productDetailDisplayResponses;
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
    public Optional<List<ProductDetailShop>> getProductDetailBestSelling() {
        List<ProductDetailShop> result = getImageByProductDetailId(repo.getProductDetailBestSelling());
        return Optional.of(result);
    }

    @Override
    public Optional<List<ProductDetailShop>> getNewProductDetail() {
        List<ProductDetailShop> result = getImageByProductDetailId(repo.getNewProductDetail());
        return Optional.of(result);
    }

    @Override
    public void updateProductDetailsByProductId(Long productId, String status) {
        repo.updateProductDetailsByProductId(productId, status);
    }

    @Override
    public Optional<Page<ProductDetailShop>> getAllProductDetailShop(ProductDetailCondition req, Pageable pageable) {

        String cateStr = "";
        String brandStr = "";
        String colorStr = "";
        String sizeStr = "";

        if (Commons.isValidList(req.getCategories())) {
            cateStr = "HasCate";
        }

        if (Commons.isValidList(req.getBrands())) {
            brandStr = "HasBrand";
        }

        if (Commons.isValidList(req.getColors())) {
            colorStr = "HasColor";
        }

        if (Commons.isValidList(req.getSizes())) {
            sizeStr = "HasSize";
        }

        String sort = null;
        if(req.getSort() != null) {
            if(req.getSort().equals("up")) {
                sort = "asc";
            } else {
                sort = "desc";
            }
        }

        List<ProductDetailShop> result = getImageByProductDetailId(repo.getAllProductDetailShop(
                req.getProductName(), req.getMinPrice(), req.getMaxPrice(), cateStr, brandStr, colorStr, sizeStr,
                req.getCategories(), req.getBrands(), req.getColors(), req.getSizes(), sort
        ));
        return Optional.of(
                (Page<ProductDetailShop>) PageUltil.page(result, pageable)
        );
    }

    @Override
    public Optional<BigDecimal> getPriceMax() {
        return repo.findAll().stream()
                .map(ProductDetail::getPrice)
                .max(BigDecimal::compareTo);
    }

    @Override
    public Optional<GetColorAndSizeAndQuantity> getColorAndSize(GetSizeAndColorRequest req) {
        GetColorAndSizeAndQuantity res = repo.findColorAndSize(req.getProductId(), req.getBrandId(), req.getCategoryId(),
                req.getPatternId(), req.getFormId(), req.getButtonId(), req.getMaterialId(), req.getCollarId(), req.getSleeveId(),
                req.getShirtTailId(), req.getColorId(), req.getSizeId());

        if(res == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        Optional<List<Color>> colors = colorServiceI.findColorsByProductId(req);
        Optional<List<Size>> sizes = sizeServiceI.findSizesByProductId(req);
        if(colors.isEmpty() || sizes.isEmpty()) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        List<Long> productDetailsId =
                repo.productDetailsId(req.getProductId(), req.getBrandId(), req.getCategoryId(), req.getPatternId(),
                        req.getFormId(), req.getButtonId(), req.getMaterialId(), req.getCollarId(), req.getSleeveId(),
                        req.getShirtTailId(), req.getColorId(), req.getSizeId());
        if(!CollectionUtils.isEmpty(productDetailsId)) {
            res.setProductDetailsId(productDetailsId);
        }
        res.setColors(colors.get());
        res.setSizes(sizes.get());

        return Optional.of(res);
    }

    @Override
    public Optional<ProductDetailShopResponse> getProductDetailsShop(GetSizeAndColorRequest request) {
        List<ProductDetailShopResponse> res = repo.findProductDetailShopResponse(request.getProductId(), request.getBrandId(), request.getCategoryId(),
                request.getPatternId(), request.getFormId(), request.getButtonId(), request.getMaterialId(), request.getCollarId(), request.getSleeveId(),
                request.getShirtTailId());
        List<Long> productDetailIds = res.stream().map(ProductDetailShopResponse::getProductDetailId).collect(Collectors.toList());
        List<ProductImageResponse> images = productImageService.getProductImageByProductDetailIds(productDetailIds);

        if (CollectionUtils.isEmpty(res)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        ProductDetailShopResponse productDetailShopResponse = res.get(0);
        GetColorAndSizeAndQuantity colorAndSize = getColorAndSize(request).orElseThrow();
        productDetailShopResponse.setColorAndSizeAndQuantity(colorAndSize);
        productDetailShopResponse.setImages(images);
        return Optional.of(productDetailShopResponse);
    }

    @Override
    public List<Long> findAllIdsResponseProductDetails(Long idPromotion) {
        return repo.findAllByIdPromotion(idPromotion);
    }

    @Override
    public List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO dto) {
        List<ProductsDetailsResponse> productsDetailsResponses = repo.getProductDetailsTableByConditionDTO(
                                                                    dto.getIdProducts(), dto.getIdButtons(), dto.getIdMaterials(),
                                                                    dto.getIdCollars(), dto.getIdSleeves(), dto.getIdShirtTails(),
                                                                    dto.getIdSizes(), dto.getIdColors(),
                                                                    StringUtils.isEmpty(dto.getSearchText()) ? null : "%" + dto.getSearchText() + "%"
                                                            );

        if(CollectionUtils.isEmpty(productsDetailsResponses)) {
            return null;
        }

        for (ProductsDetailsResponse productDetail: productsDetailsResponses) {
            List<ProductImageResponse> imageResponse = productImageService.getProductImageByProductDetailId(productDetail.getProductDetailsId());
            if(CollectionUtils.isEmpty(imageResponse)) {
                productDetail.setImageDefault(null);
            } else {
                productDetail.setImageDefault(imageResponse.get(0).getPath());
            }
        }
        return productsDetailsResponses;
    }

    private List<ProductDetailShop> getImageByProductDetailId(List<ProductDetailShop> list) {
        List<ProductDetailShop> result = new ArrayList<>();
        for (ProductDetailShop res : list) {
            res.setProductImages(productImageService.getProductImageByProductDetailId(res.getProductDetailId()));
            result.add(res);
        }

        return result;
    }

}
