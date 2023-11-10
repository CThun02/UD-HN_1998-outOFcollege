package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailSellResponse{
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
    private List<PromotionProductResponse> promotion;
    private List<ProductImageResponse> productImageResponse;

    public ProductDetailSellResponse(ProductDetailDisplayResponse productDetailDisplayResponse) {
        this.id = productDetailDisplayResponse.getId();
        this.product = productDetailDisplayResponse.getProduct();
        this.brand = productDetailDisplayResponse.getBrand();
        this.category = productDetailDisplayResponse.getCategory();
        this.button = productDetailDisplayResponse.getButton();
        this.material = productDetailDisplayResponse.getMaterial();
        this.collar = productDetailDisplayResponse.getCollar();
        this.sleeve = productDetailDisplayResponse.getSleeve();
        this.pattern = productDetailDisplayResponse.getPattern();
        this.form = productDetailDisplayResponse.getForm();
        this.size = productDetailDisplayResponse.getSize();
        this.color = productDetailDisplayResponse.getColor();
        this.shirtTail = productDetailDisplayResponse.getShirtTail();
        this.price = productDetailDisplayResponse.getPrice();
        this.weight = productDetailDisplayResponse.getWeight();
        this.quantity = productDetailDisplayResponse.getQuantity();
        this.descriptionDetail = productDetailDisplayResponse.getDescriptionDetail();
        this.status = productDetailDisplayResponse.getStatus();
        this.productImageResponse = productDetailDisplayResponse.getProductImageResponse();
    }
}
