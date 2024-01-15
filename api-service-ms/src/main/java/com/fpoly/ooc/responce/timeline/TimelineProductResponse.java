package com.fpoly.ooc.responce.timeline;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimelineProductResponse {

    private Long billId;

    private String billCode;

    private Long productDetailId;

    private Long billDetailId;

    private String productCode;

    private String productName;

    private Integer productQuantity;

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

    private BigDecimal priceProductDetailNotPromotion;

    public TimelineProductResponse(Long billId, String billCode, Long productDetailId, Long billDetailId,
                                   String productCode, String productName, Integer productQuantity, Integer quantity,
                                   BigDecimal productPrice, String productSize, String productColor, String productButton,
                                   String productCollar, String productMaterial, String productSleeve, String productShirtTail,
                                   String productColorName, String productFormName, String productPatternName, String productBrandName,
                                   String productCateGoryName, String billDetailStatus) {
        this.billId = billId;
        this.billCode = billCode;
        this.productDetailId = productDetailId;
        this.billDetailId = billDetailId;
        this.productCode = productCode;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productSize = productSize;
        this.productColor = productColor;
        this.productButton = productButton;
        this.productCollar = productCollar;
        this.productMaterial = productMaterial;
        this.productSleeve = productSleeve;
        this.productShirtTail = productShirtTail;
        this.productColorName = productColorName;
        this.productFormName = productFormName;
        this.productPatternName = productPatternName;
        this.productBrandName = productBrandName;
        this.productCateGoryName = productCateGoryName;
        this.billDetailStatus = billDetailStatus;
    }
}
