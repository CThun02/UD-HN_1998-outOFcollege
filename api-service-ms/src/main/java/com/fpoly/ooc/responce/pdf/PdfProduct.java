package com.fpoly.ooc.responce.pdf;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PdfProduct {

    private Long productDetailId;

    private Long billDetailId;

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

    private String billCreatedBy;

    private BigDecimal shippingFee;

}
