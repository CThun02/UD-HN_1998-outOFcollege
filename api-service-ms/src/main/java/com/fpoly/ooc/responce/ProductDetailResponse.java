package com.fpoly.ooc.responce;


import java.math.BigDecimal;

public interface ProductDetailResponse {
    public Long getProductId();

    public Long getId();

    public Long getPatternId();

    public Long getButtonId();

    public Long getMaterialId();

    public Long getCollarId();

    public Long getFormId();

    public Long getSleeveId();

    public Long getShirtTailId();

    public BigDecimal getPrice();

    public String getDescriptionDetail();

    public String getStatus();
}
