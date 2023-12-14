package com.fpoly.ooc.responce.cart;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.entity.SleeveType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDetailResponse {

    private Long productId;

    private Long productDetailId;

    private String productName;

    private Brand brand;

    private Category category;

    private Pattern pattern;

    private Form form;

    private ButtonType button;

    private Material material;

    private CollarType collarType;

    private SleeveType sleeveType;

    private ShirtTailType shirtTailType;

    private Size size;

    private Color color;

    private BigDecimal priceProductDetail;

    private Integer quantityProductDetail;

    private Float weight;

    private Integer quantity;

    private Long cartDetailId;

}
