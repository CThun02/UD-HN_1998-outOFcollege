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

    public GetColorAndSizeAndQuantity(BigDecimal priceProductMin, BigDecimal priceProductMax, Long quantity) {
        this.priceProductMin = priceProductMin;
        this.priceProductMax = priceProductMax;
        this.quantity = quantity;
    }
}
