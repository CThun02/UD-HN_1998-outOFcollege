package com.fpoly.ooc.request.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductImage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductImageRequest {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("productId")
    private Long productId;
    @JsonProperty("colorId")
    private Long colorId;
    @JsonProperty("path")
    private String path;
    @JsonProperty("status")
    private String status;
    @JsonProperty("isDefault")
    private Boolean isDefault;
    public ProductImage dto(){
        ProductImage productImage = ProductImage.builder().id(id).product(Product.builder().id(productId).build())
                .color(Color.builder().id(colorId).build()).path(path).isDefault(isDefault).build();
        productImage.setStatus(status);
        return productImage;
    }
}
