package com.fpoly.ooc.responce.productdetail;

import com.fpoly.ooc.entity.ProductImage;
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
    private String categoryName;
    private String productName;
    private String promotionMethod;
    private BigDecimal promotionReduce;
    private BigDecimal priceProduct;
    private Long quantitySelling;
    private List<ProductImageResponse> productImages;

    public ProductDetailShop(Long productDetailId, String categoryName, String productName,
                             String promotionMethod, BigDecimal promotionReduce, BigDecimal priceProduct, Long quantitySelling) {
        this.productDetailId = productDetailId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.promotionMethod = promotionMethod;
        this.promotionReduce = promotionReduce;
        this.priceProduct = priceProduct;
        this.quantitySelling = quantitySelling;
    }
}
