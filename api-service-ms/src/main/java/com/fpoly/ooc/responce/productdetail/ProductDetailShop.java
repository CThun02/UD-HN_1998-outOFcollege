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
public class ProductDetailShop {
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
    private Long shirtTailId;
    private String categoryName;
    private String productName;
    private String brandName;
    private String promotionMethod;
    private BigDecimal promotionReduce;
    private BigDecimal priceProductMin;
    private BigDecimal priceProductMax;
    private Long quantitySelling;
    private List<ProductImageResponse> productImages;

    public ProductDetailShop(Long productDetailId, Long productId, Long brandId, Long categoryId, Long patternId, Long formId,
                             Long buttonId, Long materialId, Long collarId, Long sleeveId, Long shirtTailId, String categoryName,
                             String productName, String brandName, String promotionMethod, BigDecimal promotionReduce, BigDecimal priceProduct,
                             Long quantitySelling) {
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
        this.shirtTailId = shirtTailId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.brandName = brandName;
        this.promotionMethod = promotionMethod;
        this.promotionReduce = promotionReduce;
        this.priceProductMin = priceProduct;
        this.quantitySelling = quantitySelling;
    }

    public ProductDetailShop(Long productId, Long brandId, Long categoryId, Long patternId, Long formId,
                             Long buttonId, Long materialId, Long collarId, Long sleeveId, Long shirtTailId, String categoryName,
                             String productName, String brandName, String promotionMethod, BigDecimal promotionReduce, BigDecimal priceProductMin,
                             BigDecimal priceProductMax) {
        this.productId = productId;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.patternId = patternId;
        this.formId = formId;
        this.buttonId = buttonId;
        this.materialId = materialId;
        this.collarId = collarId;
        this.sleeveId = sleeveId;
        this.shirtTailId = shirtTailId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.brandName = brandName;
        this.promotionMethod = promotionMethod;
        this.promotionReduce = promotionReduce;
        this.priceProductMin = priceProductMin;
        this.priceProductMax = priceProductMax;
    }

    public ProductDetailShop(Long productId, Long brandId, Long categoryId, Long patternId, Long formId,
                             Long buttonId, Long materialId, Long collarId, Long sleeveId, Long shirtTailId, String categoryName,
                             String productName, String brandName, BigDecimal priceProductMin,
                             BigDecimal priceProductMax) {
        this.productId = productId;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.patternId = patternId;
        this.formId = formId;
        this.buttonId = buttonId;
        this.materialId = materialId;
        this.collarId = collarId;
        this.sleeveId = sleeveId;
        this.shirtTailId = shirtTailId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.brandName = brandName;
        this.priceProductMin = priceProductMin;
        this.priceProductMax = priceProductMax;
    }
}
