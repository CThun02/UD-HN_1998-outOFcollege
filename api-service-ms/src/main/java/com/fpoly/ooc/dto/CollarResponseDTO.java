package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.CollarType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollarResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("collarTypeName")
    private String collarTypeName;

    public CollarResponseDTO(CollarType collarType) {
        if (Objects.nonNull(collarType)) {
            this.id = collarType.getId();
            this.collarTypeName = collarType.getCollarTypeName();
        }
    }
}