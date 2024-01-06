package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("colorCode")
    private String colorCode;
    @JsonProperty("colorName")
    private String colorName;

    public ColorResponseDTO(Color color) {
        if (Objects.nonNull(color)) {
            this.id = color.getId();
            this.colorCode = color.getColorCode();
            this.colorName = color.getColorName();
        }
    }
}
