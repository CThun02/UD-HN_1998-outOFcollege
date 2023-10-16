package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsDTO {

    private String searchText;

    private List<Long> idProducts;

    private Long idButtons;

    private Long idMaterials;

    private Long idCollars;

    private Long idSleeves;

    private Long idShirtTails;

    private Long idSizes;

    private Long idColors;

}
