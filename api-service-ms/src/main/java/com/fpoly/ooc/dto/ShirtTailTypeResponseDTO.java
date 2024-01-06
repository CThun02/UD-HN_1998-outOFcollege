package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.ShirtTailType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShirtTailTypeResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("shirtTailTypeName")
    private String shirtTailTypeName;

    public ShirtTailTypeResponseDTO(ShirtTailType shirtTailType) {
        if (Objects.nonNull(shirtTailType)) {
            this.id = shirtTailType.getId();
            this.shirtTailTypeName = shirtTailType.getShirtTailTypeName();
        }
    }
}
