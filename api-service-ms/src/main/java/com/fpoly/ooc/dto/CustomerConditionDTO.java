package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerConditionDTO {

    private String searchText;

    private String gender;
}
