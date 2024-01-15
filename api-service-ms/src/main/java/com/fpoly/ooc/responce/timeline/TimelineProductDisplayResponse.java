package com.fpoly.ooc.responce.timeline;

import com.fpoly.ooc.responce.product.ProductImageResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TimelineProductDisplayResponse {

    private Long billId;

    private String billCode;

    private Long productDetailId;

    private Long billDetailId;

    private String productCode;

    private String productName;

    private Integer quantity;

    private BigDecimal productPrice;

    private String productSize;

    private String productColor;

    private String productButton;

    private String productCollar;

    private String productMaterial;

    private String productSleeve;

    private String productShirtTail;

    private String productColorName;

    private String productFormName;

    private String productPatternName;

    private String productBrandName;

    private String productCateGoryName;

    private String billDetailStatus;

    private String numberPhone;

    private String address;

    private Integer productQuantity;

    private List<ProductImageResponse> productImageResponses;

    private Boolean checkInPromotion;

    private String promotionMethod;

    private BigDecimal promotionValue;

    public TimelineProductDisplayResponse(TimelineProductResponse timelineProductResponse) {
        this.billId= timelineProductResponse.getBillId();
        this.billCode = timelineProductResponse.getBillCode();
        this.productDetailId = timelineProductResponse.getProductDetailId();
        this.billDetailId = timelineProductResponse.getBillDetailId();
        this.productName = timelineProductResponse.getProductName();
        this.quantity = timelineProductResponse.getQuantity();
        this.productPrice = timelineProductResponse.getProductPrice();
        this.productSize = timelineProductResponse.getProductSize();
        this.productColor = timelineProductResponse.getProductColor();
        this.productButton = timelineProductResponse.getProductButton();
        this.productCollar = timelineProductResponse.getProductCollar();
        this.productMaterial = timelineProductResponse.getProductMaterial();
        this.productSleeve = timelineProductResponse.getProductSleeve();
        this.productShirtTail = timelineProductResponse.getProductShirtTail();
        this.productColorName = timelineProductResponse.getProductColorName();
        this.productFormName = timelineProductResponse.getProductFormName();
        this.productPatternName = timelineProductResponse.getProductPatternName();
        this.productBrandName = timelineProductResponse.getProductBrandName();
        this.productCateGoryName = timelineProductResponse.getProductCateGoryName();
        this.billDetailStatus = timelineProductResponse.getBillDetailStatus();
        this.productCode = timelineProductResponse.getProductCode();
        this.productQuantity = timelineProductResponse.getProductQuantity();
    }
}
