package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.common.Commons;
import com.fpoly.ooc.common.SimpleSendProductDetail;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.dto.UpdateQuantityProductDetailDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.request.product.ProductDetailCondition;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.responce.component.component;
import com.fpoly.ooc.service.interfaces.*;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import com.fpoly.ooc.util.CommonUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductDetailServiceImpl implements ProductDetailServiceI {
    private ProductDetailDAORepositoryI repo;
    private ProductImageServiceI productImageService;
    private ColorServiceI colorServiceI;
    private SizeServiceI sizeServiceI;
    private KafkaUtil kafkaUtil;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private ObjectMapper objectMapper;


    @Autowired
    public ProductDetailServiceImpl(ProductDetailDAORepositoryI repo, ProductImageServiceI productImageService,
                                    ColorServiceI colorServiceI, SizeServiceI sizeServiceI, KafkaUtil kafkaUtil) {
        this.repo = repo;
        this.productImageService = productImageService;
        this.colorServiceI = colorServiceI;
        this.sizeServiceI = sizeServiceI;
        this.kafkaUtil = kafkaUtil;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ProductDetail create(ProductDetail productDetail) throws JsonProcessingException {
        if(productDetail.getQuantity() == 0){
            productDetail.setStatus(Const.STATUS_INACTIVE);
        }
        ProductDetail productDetailDb = repo.save(productDetail);
        return productDetailDb;
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) throws JsonProcessingException, NotFoundException {
        ProductDetail productDetailtCheck = this.getOne(productDetail.getId());
        if(productDetail.getQuantity() == 0){
            productDetail.setStatus(Const.STATUS_INACTIVE);
        }
        if (Objects.nonNull(productDetailtCheck)) {
            kafkaUtil.sendingObjectWithKafka(productDetail, Const.TOPIC_PRODUCT_DETAIL);
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
        return repo.findProductDetailByIdAndStatus(id, Const.STATUS_ACTIVE);
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

    public ProductDetail findById(Long id) throws NotFoundException {
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
    public Optional<List<ProductDetailShop>> getAllProductDetailShop(ProductDetailCondition req) {

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

//        String sort = null;
//        if(req.getSort() != null) {
//            if(req.getSort().equals("up")) {
//                sort = "asc";
//            } else {
//                sort = "desc";
//            }
//        }

        List<ProductDetailShop> result = repo.getAllProductDetailShop(
                req.getProductName(), req.getMinPrice(), req.getMaxPrice(), cateStr, brandStr, colorStr, sizeStr,
                req.getCategories(), req.getBrands(), req.getColors(), req.getSizes()
        );

        result.stream().map(productDetail -> {
            List<Long> productDetailIdsByComponent =
                    repo.productDetailsId(productDetail.getProductId(), productDetail.getBrandId(), productDetail.getCategoryId(),
                            productDetail.getPatternId(), productDetail.getFormId(), productDetail.getButtonId(), productDetail.getMaterialId(),
                            productDetail.getCollarId(), productDetail.getSleeveId(), productDetail.getShirtTailId());

            Long productDetailId = CommonUtils.getOneElementsInArrays(productDetailIdsByComponent);
            if(Objects.nonNull(productDetailId)) {
                productDetail.setProductDetailId(productDetailIdsByComponent.get(0));
            }

            return productDetail;
        }).collect(Collectors.toList());

        return Optional.of(getImageByProductDetailId(result));
    }

    @Override
    public Optional<BigDecimal> getPriceMax() {
        return repo.findAll().stream()
                .map(ProductDetail::getPrice)
                .max(BigDecimal::compareTo);
    }

    @Override
    public Optional<GetColorAndSizeAndQuantity> getColorAndSize(GetSizeAndColorRequest req) throws NotFoundException {
        List<GetColorAndSizeAndQuantity> colorAndSizeListByReq = repo.findColorAndSize(req.getProductId(), req.getBrandId(), req.getCategoryId(),
                req.getPatternId(), req.getFormId(), req.getButtonId(), req.getMaterialId(), req.getCollarId(), req.getSleeveId(),
                req.getShirtTailId(), req.getColorId(), req.getSizeId());
        GetColorAndSizeAndQuantity res = CommonUtils.getOneElementsInArrays(colorAndSizeListByReq);
        if(Objects.isNull(res)) {
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
    public Optional<ProductDetailShopResponse> getProductDetailsShop(GetSizeAndColorRequest request) throws NotFoundException {
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
    public Boolean isCheckQuantity(Long productDetailId) throws NotFoundException {
        Boolean isProductDetail = repo.findProductDetailById(productDetailId);
        if (!isProductDetail) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_PRODUCT_NOT_FOUND));
        }

        return true;
    }

    @Override
    public ProductDetail updateQuantityForBuy(ProductDetail productDetail) {
        if (productDetail.getQuantity() >= 0 && productDetail.getStatus().equals(Const.STATUS_ACTIVE)) {
            return repo.save(productDetail);
        }
        return null;
    }

    @Override
    public ProductDetail findProductDetailByIdAndStatus(Long id) throws NotFoundException {
        ProductDetail productDetail = repo.findProductDetailByIdAndStatusAndQuantityGreaterThan(id, Const.STATUS_ACTIVE, 0);

        if (Objects.nonNull(productDetail)) {
            return productDetail;
        }

        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
    }

    @Override
    public List<component> getColorProductDetailEdit(Long productDetailId, Long sizeId) {
        ProductDetail productDetail = this.getOne(productDetailId);
        List<component> colors= productDetail!=null? repo.getColorProductDetailEdit(productDetail.getProduct().getId(), productDetail.getButton().getId(),
                productDetail.getMaterial().getId(), productDetail.getShirtTail().getId(), productDetail.getSleeve().getId(),
                productDetail.getCollar().getId(), sizeId, productDetail.getPattern().getId(), productDetail.getForm().getId(),
                productDetail.getBrand().getId(), productDetail.getCategory().getId()):null;
        return colors;
    }

    @Override
    public List<component> getSizeProductDetailEdit(Long productDetailId, Long colorId) {
        ProductDetail productDetail = this.getOne(productDetailId);
        List<component> sizes= productDetail!=null? repo.getSizeProductDetailEdit(productDetail.getProduct().getId(), productDetail.getButton().getId(),
                productDetail.getMaterial().getId(), productDetail.getShirtTail().getId(), productDetail.getSleeve().getId(),
                productDetail.getCollar().getId(), colorId, productDetail.getPattern().getId(), productDetail.getForm().getId(),
                productDetail.getBrand().getId(), productDetail.getCategory().getId()):null;
        return sizes;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ProductDetail updateQuantityProductDetail(UpdateQuantityProductDetailDTO req) throws NotFoundException, JsonProcessingException {

        if (Objects.isNull(req)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        if (Objects.isNull(req.getProductDetail())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PRODUCT_DETAIL_NOT_FOUND));
        }

        if (Objects.nonNull(req.getQuantityCurrent()) && req.getQuantityCurrent() <= 0) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.LIMIT_QUANTITY_LESS_ZERO));
        }

        ProductDetail getOneProduct = getOne(req.getProductDetail().getId());
        if (Objects.isNull(getOneProduct)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PRODUCT_DETAIL_NOT_FOUND));
        }

        int quantityUpdate = -1;
        if (Objects.isNull(req.getQuantityUpdate())) {
            getOneProduct.setQuantity(getOneProduct.getQuantity() - req.getQuantityCurrent());
        } else {
            if (req.getQuantityCurrent() > req.getQuantityUpdate()) {
                quantityUpdate = req.getQuantityCurrent() - req.getQuantityUpdate();
                getOneProduct.setQuantity(getOneProduct.getQuantity() + quantityUpdate);
            } else {
                quantityUpdate = req.getQuantityUpdate() - req.getQuantityCurrent();
                if (getOneProduct.getQuantity() - quantityUpdate < 0) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
                }
                getOneProduct.setQuantity(getOneProduct.getQuantity() - quantityUpdate);
            }
        }

        return repo.save(getOneProduct);
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
