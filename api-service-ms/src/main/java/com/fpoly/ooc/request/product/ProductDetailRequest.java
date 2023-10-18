package com.fpoly.ooc.request.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.*;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ProductDetailRequest {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("productId")
    private Long productId;
    @JsonProperty("buttonId")
    private Long buttonId;
    @JsonProperty("materialId")
    private Long materialId;
    @JsonProperty("collarId")
    private Long collarId;
    @JsonProperty("sleeveId")
    private Long sleeveId;
    @JsonProperty("sizeId")
    private Long sizeId;
    @JsonProperty("colorId")
    private Long colorId;
    @JsonProperty("shirtTailId")
    private Long shirtTailId;
    @JsonProperty("patternId")
    private Long patternId;
    @JsonProperty("formId")
    private Long formId;
    @JsonProperty("price")
    private BigDecimal price;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("descriptionDetail")
    private String descriptionDetail;
    @JsonProperty("status")
    private String status;

    public ProductDetail dto(){
        ProductDetail productDetail = ProductDetail.builder().id(id).product(Product.builder().id(productId).build())
                .button(ButtonType.builder().id(buttonId).build()).material(Material.builder().id(materialId).build())
                .collar(CollarType.builder().id(collarId).build()).sleeve(SleeveType.builder().id(sleeveId).build())
                .pattern(Pattern.builder().id(patternId).build()).form(Form.builder().id(formId).build())
                .shirtTail(ShirtTailType.builder().id(shirtTailId).build()).size(Size.builder().id(sizeId).build())
                .color(Color.builder().id(colorId).build()).color(Color.builder().id(colorId).build()).price(price)
                .quantity(quantity).descriptionDetail(descriptionDetail).build();
        productDetail.setStatus(status);
        return productDetail;
    }
}
