package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

public interface ProductDetailResponse {
    public Long getId();
    public Product getProduct();
    public ButtonType getButton();
    public Material getMaterial();
    public CollarType getCollar();
    public SleeveType getSleeve();
    public Pattern getPattern();
    public Form getForm();
    public Size getSize();
    public Color getColor();
    public ShirtTailType getShirtTail();
    public BigDecimal getPrice();
    public Integer getQuantity();
    public String getDescriptionDetail();
    public String getStatus();
}
