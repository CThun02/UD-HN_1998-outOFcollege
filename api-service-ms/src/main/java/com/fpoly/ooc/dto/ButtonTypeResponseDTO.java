package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.ButtonType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ButtonTypeResponseDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("buttonName")
    private String buttonName;

    public ButtonTypeResponseDTO(ButtonType buttonType) {
        if (Objects.nonNull(buttonType)) {
            this.id = buttonType.getId();
            this.buttonName = buttonType.getButtonName();
        }
    }
}
