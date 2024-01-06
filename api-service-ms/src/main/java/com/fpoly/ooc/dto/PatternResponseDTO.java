package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatternResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("patternName")
    private String patternName;

    public PatternResponseDTO(Pattern pattern) {
        if (Objects.nonNull(pattern)) {
            this.id = pattern.getId();
            this.patternName = pattern.getPatternName();
        }
    }
}
