package com.fpoly.ooc.responce.product;

import java.time.LocalDateTime;

public interface ProductResponseEdit {
    Long getId();
    Long getBrandId();
    Long getCategoryId();
    String getProductCode();
    String getProductName();
    LocalDateTime getCreatedAt();
    String getCreatedBy();
}
