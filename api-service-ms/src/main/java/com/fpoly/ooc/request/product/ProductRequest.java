package com.fpoly.ooc.request.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest{
    @JsonProperty("id")
    private Long id;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("description")
    private String description;
    @JsonProperty("status")
    private String status;

    public Product dto(){
        Product product = Product.builder().id(id).productCode(productCode).productName(productName)
                .description(description).build();
        product.setStatus(status);
        return product;
    }
}
