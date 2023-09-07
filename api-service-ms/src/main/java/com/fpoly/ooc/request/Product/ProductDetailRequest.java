package com.fpoly.ooc.request;

import com.fpoly.ooc.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailRequest {
    private Long id;
    private Long productId;
    private Long patternId;
    private Long buttonId;
    private Long materialId;
    private Long collarId;
    private Long sleeveId;
    private Long sizeId;
    private String colorId;
    private Long formId;
    private Long shirtTailId;
    private BigDecimal price;
    private Integer quantity;
    private String descriptionDetail;
    private Boolean status;

    public ProductDetail dto(){
        Size size = sizeId==null?null:Size.builder().id(sizeId).build();
        Color color = sizeId==null?null:Color.builder().id(colorId).build();
        return new ProductDetail(id, Product.builder().id(productId).build(), Pattern.builder().id(patternId).build(),
                ButtonType.builder().id(buttonId).build(), Material.builder().id(materialId).build(), CollarType.builder().id(collarId).build(),
                SleeveType.builder().id(sleeveId).build(), size, color,
                Form.builder().id(formId).build(), ShirtTailType.builder().id(shirtTailId).build(), price, quantity,
                descriptionDetail, status==true?"Active":"InActive");
    }
}
