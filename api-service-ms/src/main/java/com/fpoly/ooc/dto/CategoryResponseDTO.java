package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("categoryName")
    private String categoryName;

    public CategoryResponseDTO(Category category) {
        if (Objects.nonNull(category)) {
            this.id = category.getId();
            this.categoryName = category.getCategoryName();
        }
    }
}
