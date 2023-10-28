package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import java.math.BigDecimal;

public interface ProductDetailResponse {
    public Long getId();
    public Product getProduct();
    public Brand getBrand();
    public Category getCategory();
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
    public Float getWeight();
    public Integer getQuantity();
    public String getDescriptionDetail();
    public String getStatus();
}
