package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.*;
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
public class ProductDetailDisplayResponse{
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
    private List<ProductImageResponse> productImageResponse;

    public ProductDetailDisplayResponse(ProductDetailResponse productDetailResponse, List<ProductImageResponse> images) {
        this.id = productDetailResponse.getId();
        this.product = productDetailResponse.getProduct();
        this.brand = productDetailResponse.getBrand();
        this.category = productDetailResponse.getCategory();
        this.button = productDetailResponse.getButton();
        this.material = productDetailResponse.getMaterial();
        this.collar = productDetailResponse.getCollar();
        this.sleeve = productDetailResponse.getSleeve();
        this.pattern = productDetailResponse.getPattern();
        this.form = productDetailResponse.getForm();
        this.size = productDetailResponse.getSize();
        this.color = productDetailResponse.getColor();
        this.shirtTail = productDetailResponse.getShirtTail();
        this.price = productDetailResponse.getPrice();
        this.weight = productDetailResponse.getWeight();
        this.quantity = productDetailResponse.getQuantity();
        this.descriptionDetail = productDetailResponse.getDescriptionDetail();
        this.status = productDetailResponse.getStatus();
        this.productImageResponse = images;
    }
}
