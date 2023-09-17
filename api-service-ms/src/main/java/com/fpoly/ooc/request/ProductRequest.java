package com.fpoly.ooc.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.*;

public class ProductRequest {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("brandId")
    private Long brandId;
    @JsonProperty("categoryId")
    private Long categoryId;
    @JsonProperty("formId")
    private Long formId;
    @JsonProperty("patternId")
    private Long patternId;
    @JsonProperty("description")
    private String description;
    @JsonProperty("status")
    private String status;

    public Product dto(){
        Product product = Product.builder().id(id).productCode(productCode).productName(productName)
                .brand(Brand.builder().id(brandId).build()).form(Form.builder().id(formId).build())
                .category(Category.builder().id(categoryId).build()).pattern(Pattern.builder().id(patternId).build())
                .description(description).build();
        product.setStatus(status);
        return product;
    }
}
