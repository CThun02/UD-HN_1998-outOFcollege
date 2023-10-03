package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Pattern;

import java.time.LocalDateTime;

public interface ProductTableResponse {
    Long getId();
    String getProductCode();
    String getProductName();
    String getImgDefault();
    Brand getBrand();
    Category getCategory();
    Pattern getPattern();
    Form getForm();
    Integer getQuantity();
    String getStatus();
    String getDescription();
}
