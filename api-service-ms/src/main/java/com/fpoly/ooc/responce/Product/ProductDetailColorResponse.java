package com.fpoly.ooc.responce.Product;
import lombok.Builder;

import java.math.BigDecimal;

public interface ProductDetailColorResponse {
    public Long getProductDetailId() ;
    public String getColorId() ;
    public Integer getQuantity() ;
    public BigDecimal getPrice() ;
}
