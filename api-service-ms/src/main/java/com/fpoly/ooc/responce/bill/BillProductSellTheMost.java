package com.fpoly.ooc.responce.bill;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BillProductSellTheMost {
    private Long id;
    private Product product;
    private Brand brand;
    private Category category;
    private ButtonType button;
    private Material material;
    private CollarType collar;
    private SleeveType sleeve;
    private Pattern pattern;
    private Form form;
    private Size size;
    private Color color;
    private ShirtTailType shirtTail;
    private BigDecimal price;
    private Float weight;
    private Integer quantity;
    private String descriptionDetail;
    private String status;
    private String promotionMethod;
    private BigDecimal promotionValue;
    private BigDecimal promotionCondition;
    private List<ProductImageResponse> productImageResponse;
}
