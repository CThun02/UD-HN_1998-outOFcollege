package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Product;

public interface ProductImageResponse {
    public Long getId();
    public Product getProduct();
    public Color getColor();
    public String getPath();
    public String getStatus();
}
