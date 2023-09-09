package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.entity.SleeveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponse {

    private Long id;

    private Product product;

    private Pattern pattern;

    private ButtonType button;

    private Material material;

    private CollarType collar;

    private SleeveType sleeve;

    private Size size;

    private Color color;

    private Form form;

    private ShirtTailType shirtTail;

    private BigDecimal price;

    private Integer quantity;

    private String descriptionDetail;

    private String status;

    private LocalDateTime createdAt;

    private String createdBy;

    private LocalDateTime updatedAt;

    private String updatedBy;

    private LocalDateTime deletedAt;

}
