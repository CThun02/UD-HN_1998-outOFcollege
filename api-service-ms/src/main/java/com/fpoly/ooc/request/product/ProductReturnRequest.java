package com.fpoly.ooc.request.product;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ProductReturn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductReturnRequest {
    private Long id;
    private Long productDetailId;
    private Long billId;
    private Integer quantity;
    private String reason;
    private BigDecimal price;

    public ProductReturn dto(){
        ProductReturn productReturn = ProductReturn.builder().productDetail(ProductDetail.builder().id(productDetailId).build())
                .bill(Bill.builder().id(billId).build()).quantity(quantity).reason(reason).price(price).build();
        return productReturn;
    }
}
