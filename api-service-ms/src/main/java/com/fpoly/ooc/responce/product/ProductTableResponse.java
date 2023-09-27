package com.fpoly.ooc.responce.product;

import java.time.LocalDateTime;

public interface ProductTableResponse {
    Long getId();
    String getProductName();
    String getImgDefault();
    Integer getQuantity();
    String getStatus();
    LocalDateTime getCreatedAt();
}
