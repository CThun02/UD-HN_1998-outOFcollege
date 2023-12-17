package com.fpoly.ooc.responce.productdetail;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetColorAndSizeAndQuantity {
    private List<Color> colors;
    private List<Size> sizes;
    private BigDecimal priceProductMin;
    private BigDecimal priceProductMax;
    private Long quantity;
    private List<Long> productDetailsId;
    private String promotionType;
    private BigDecimal promotionValue;

    public GetColorAndSizeAndQuantity(BigDecimal priceProductMin, BigDecimal priceProductMax, Long quantity, String promotionType,
                                      BigDecimal promotionValue) {
        this.priceProductMin = priceProductMin;
        this.priceProductMax = priceProductMax;
        this.quantity = quantity;
        this.promotionType = promotionType;
        this.promotionValue = promotionValue;
    }

    public GetColorAndSizeAndQuantity(BigDecimal priceProductMin, BigDecimal priceProductMax, String promotionType,
                                      BigDecimal promotionValue) {
        this.priceProductMin = priceProductMin;
        this.priceProductMax = priceProductMax;
        this.promotionType = promotionType;
        this.promotionValue = promotionValue;
    }
}
