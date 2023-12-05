package com.fpoly.ooc.responce.timeline;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimelineProductResponse {

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

}
