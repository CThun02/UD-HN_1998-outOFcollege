package com.fpoly.ooc.responce.productdetail;

import com.fpoly.ooc.responce.product.ProductImageResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailShopResponse {
    private List<ProductImageResponse> images;
    private GetColorAndSizeAndQuantity colorAndSizeAndQuantity;
    private Long productDetailId;
    private Long productId;
    private Long brandId;
    private Long categoryId;
    private Long patternId;
    private Long formId;
    private Long buttonId;
    private Long materialId;
    private Long collarId;
    private Long sleeveId;
    private Long shirtId;
    private String productName;
    private String brandName;
    private String categoryName;
    private String patternName;
    private String formName;
    private String buttonName;
    private String materialName;
    private String collarName;
    private String sleeveName;
    private String shirtTail;
    private  Float weight;
    private String description;
    private String promotionMethod;
    private BigDecimal promotionValue;

    public ProductDetailShopResponse(Long productDetailId, Long productId, Long brandId, Long categoryId,
                                     Long patternId, Long formId, Long buttonId, Long materialId, Long collarId,
                                     Long sleeveId, Long shirtId, String productName, String brandName,
                                     String categoryName, String patternName, String formName, String buttonName,
                                     String materialName, String collarName, String sleeveName, String shirtTail,
                                     Float weight, String description, String promotionMethod, BigDecimal promotionValue) {
        this.productDetailId = productDetailId;
        this.productId = productId;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.patternId = patternId;
        this.formId = formId;
        this.buttonId = buttonId;
        this.materialId = materialId;
        this.collarId = collarId;
        this.sleeveId = sleeveId;
        this.shirtId = shirtId;
        this.productName = productName;
        this.brandName = brandName;
        this.categoryName = categoryName;
        this.patternName = patternName;
        this.formName = formName;
        this.buttonName = buttonName;
        this.materialName = materialName;
        this.collarName = collarName;
        this.sleeveName = sleeveName;
        this.shirtTail = shirtTail;
        this.weight = weight;
        this.description = description;
        this.promotionMethod = promotionMethod;
        this.promotionValue = promotionValue;
    }
}
