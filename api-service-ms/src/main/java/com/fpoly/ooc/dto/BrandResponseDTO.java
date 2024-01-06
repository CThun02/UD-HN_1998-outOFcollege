package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Brand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("brandName")
    private String brandName;

    public BrandResponseDTO(Brand brand) {
        if (Objects.nonNull(brand)) {
            this.id = brand.getId();
            this.brandName = brand.getBrandName();
        }
    }
}
