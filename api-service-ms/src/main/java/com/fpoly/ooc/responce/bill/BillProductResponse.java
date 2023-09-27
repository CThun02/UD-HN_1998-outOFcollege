package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillProductResponse {

    private Long productId;

    private String imgDefault;

    private String productName;

    private String brandName;

    private String categoryName;

    private String patternName;

    private String formName;

}
