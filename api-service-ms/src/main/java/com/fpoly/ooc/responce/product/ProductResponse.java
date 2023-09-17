package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Pattern;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public interface ProductResponse {
    public Long getId();
    public String getProductCode();
    public String getProductName();
    public String getDescription();
    public String getImgDefault();
    public Category getCategory();
    public Brand getBrand();
    public Pattern getPattern();
    public Form getForm();
}
