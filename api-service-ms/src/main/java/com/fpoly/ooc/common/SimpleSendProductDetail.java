package com.fpoly.ooc.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.UpdateQuantityProductDetailDTO;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import com.fpoly.ooc.util.CommonUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Data
@AllArgsConstructor
@Slf4j
public class SimpleSendProductDetail {

    private SimpMessagingTemplate template;
    private ObjectMapper objectMapper;
    private ProductDetailDAORepositoryI productDetailDAORepositoryI;
    private ProductImageServiceI productImageServiceI;
    private ColorServiceI colorServiceI;
    private SizeServiceI sizeServiceI;
    private ProductDetailServiceI productDetailServiceI;
    private BillService billService;

    public void updateQuantityRealtime(UpdateQuantityProductDetailDTO dto) throws NotFoundException, JsonProcessingException {
        if (Objects.isNull(dto) || Objects.isNull(dto.getProductDetail())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        if (Objects.isNull(dto.getProductDetail().getProduct()) || Objects.isNull(dto.getProductDetail().getBrand()) ||
                Objects.isNull(dto.getProductDetail().getCategory()) || Objects.isNull(dto.getProductDetail().getPattern()) ||
                Objects.isNull(dto.getProductDetail().getForm()) || Objects.isNull(dto.getProductDetail().getButton()) ||
                Objects.isNull(dto.getProductDetail().getMaterial()) || Objects.isNull(dto.getProductDetail().getCollar()) ||
                Objects.isNull(dto.getProductDetail().getSleeve()) || Objects.isNull(dto.getProductDetail().getShirtTail())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        List<ProductDetailShopResponse> response = productDetailDAORepositoryI.findProductDetailShopResponse(dto.getProductDetail().getProduct().getId(), dto.getProductDetail().getBrand().getId(),
                dto.getProductDetail().getCategory().getId(), dto.getProductDetail().getPattern().getId(), dto.getProductDetail().getForm().getId(),
                dto.getProductDetail().getButton().getId(), dto.getProductDetail().getMaterial().getId(), dto.getProductDetail().getCollar().getId(), dto.getProductDetail().getSleeve().getId(),
                dto.getProductDetail().getShirtTail().getId());
        List<Long> productDetailIds = response.stream().map(ProductDetailShopResponse::getProductDetailId).collect(Collectors.toList());
        List<ProductImageResponse> images = productImageServiceI.getProductImageByProductDetailIds(productDetailIds);

        if (CollectionUtils.isEmpty(response)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        GetSizeAndColorRequest request = new GetSizeAndColorRequest();
        request.setColorId(dto.getProductDetail().getColor().getId());
        request.setSizeId(dto.getProductDetail().getSize().getId());
        request.setProductId(dto.getProductDetail().getProduct().getId());
        request.setProductDetailId(dto.getProductDetail().getId());
        request.setBrandId(dto.getProductDetail().getBrand().getId());
        request.setCategoryId(dto.getProductDetail().getCategory().getId());
        request.setPatternId(dto.getProductDetail().getPattern().getId());
        request.setFormId(dto.getProductDetail().getForm().getId());
        request.setButtonId(dto.getProductDetail().getButton().getId());
        request.setMaterialId(dto.getProductDetail().getMaterial().getId());
        request.setCollarId(dto.getProductDetail().getCollar().getId());
        request.setSleeveId(dto.getProductDetail().getSleeve().getId());
        request.setShirtTailId(dto.getProductDetail().getShirtTail().getId());

        List<GetColorAndSizeAndQuantity> colorAndSizeListByReq = productDetailDAORepositoryI.findColorAndSize(request.getProductId(), request.getBrandId(), request.getCategoryId(),
                request.getPatternId(), request.getFormId(), request.getButtonId(), request.getMaterialId(), request.getCollarId(), request.getSleeveId(),
                request.getShirtTailId(), request.getColorId(), request.getSizeId());

        GetColorAndSizeAndQuantity res = CommonUtils.getOneElementsInArrays(colorAndSizeListByReq);
        if (Objects.nonNull(res)) {
            List<Long> productDetailsId =
                    productDetailDAORepositoryI.productDetailsId(request.getProductId(), request.getBrandId(), request.getCategoryId(), request.getPatternId(),
                            request.getFormId(), request.getButtonId(), request.getMaterialId(), request.getCollarId(), request.getSleeveId(),
                            request.getShirtTailId(), request.getColorId(), request.getSizeId());
            if (!CollectionUtils.isEmpty(productDetailsId)) {
                res.setProductDetailsId(productDetailsId);
            }

            Optional<List<Color>> colors = colorServiceI.findColorsByProductId(request);
            Optional<List<Size>> sizes = sizeServiceI.findSizesByProductId(request);
            if (colors.isPresent() && sizes.isPresent()) {
                if (CollectionUtils.isNotEmpty(colors.get()) && CollectionUtils.isNotEmpty(sizes.get())) {
                    res.setColors(colors.get());
                    res.setSizes(sizes.get());
                    String colorsAndSizes = objectMapper.writeValueAsString(res);
                    template.convertAndSend("/topic/colorsAndSizes-topic", colorsAndSizes);
                }
            }
        }

        ProductDetailShopResponse productDetailShopResponse = response.get(0);
        GetColorAndSizeAndQuantity colorAndSize = productDetailServiceI.getColorAndSize(request).orElseThrow();
        productDetailShopResponse.setColorAndSizeAndQuantity(colorAndSize);
        productDetailShopResponse.setImages(images);

        if (Objects.nonNull(dto.getRequest())) {
            List<ProductDetailSellResponse> list = billService.getProductDetailSellInStore(dto.getRequest(), dto.getMin(), dto.getMaxPrice());

            if (CollectionUtils.isNotEmpty(list)) {
                String billOrder = objectMapper.writeValueAsString(list);
                template.convertAndSend("/topic/billOrder-topic", billOrder);
            }
        }

        String productDetailsJson = objectMapper.writeValueAsString(productDetailShopResponse);
        String productDetailsShopJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getAllProductDetailShop(
                null, null, null, "", "", "", "", null,
                null, null, null));
        String bestSellingJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getProductDetailBestSelling());
        String newProductJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getNewProductDetail());

        template.convertAndSend("/topic/getOneProductDetail-topic", productDetailsJson);
        template.convertAndSend("/topic/productDetailShop-topic", productDetailsShopJson);
        template.convertAndSend("/topic/bestSellingProduct-topic", bestSellingJson);
        template.convertAndSend("/topic/newProduct-topic", newProductJson);
        log.info("ProductDetailJson: " + productDetailsJson);
    }

}
