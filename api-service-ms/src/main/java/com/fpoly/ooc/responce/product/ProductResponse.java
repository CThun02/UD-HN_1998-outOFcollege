package com.fpoly.ooc.responce.product;

import java.time.LocalDateTime;

public interface ProductResponse {
    Long getId();
    Long getBrandId();
    Long getCategoryId();
    String getProductCode();
    String getProductName();
    String getDescription();
    String getImgDefault();
    String getStatus();
    LocalDateTime getCreatedAt();
    String getCreatedBy();
}
