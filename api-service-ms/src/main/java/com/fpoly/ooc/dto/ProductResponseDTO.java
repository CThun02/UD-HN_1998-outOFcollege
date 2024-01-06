package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("description")
    private String description;
    @JsonProperty("status")
    private String status;

    public ProductResponseDTO(Product product) {
        if (Objects.nonNull(product)) {
            this.id = product.getId();
            this.productCode = product.getProductCode();
            this.productName = product.getProductName();
            this.description = product.getDescription();
            this.status = product.getStatus();
        }
    }
}
