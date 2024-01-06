package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.dto.BrandResponseDTO;
import com.fpoly.ooc.dto.ButtonTypeResponseDTO;
import com.fpoly.ooc.dto.CategoryResponseDTO;
import com.fpoly.ooc.dto.CollarResponseDTO;
import com.fpoly.ooc.dto.ColorResponseDTO;
import com.fpoly.ooc.dto.FormResponseDTO;
import com.fpoly.ooc.dto.MaterialResponseDTO;
import com.fpoly.ooc.dto.PatternResponseDTO;
import com.fpoly.ooc.dto.ProductResponseDTO;
import com.fpoly.ooc.dto.ShirtTailTypeResponseDTO;
import com.fpoly.ooc.dto.SizeResponseDTO;
import com.fpoly.ooc.dto.SleeveResponseDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailSellResponse{
    private Long id;
    private ProductResponseDTO product;
    private BrandResponseDTO brand;
    private CategoryResponseDTO category;
    private ButtonTypeResponseDTO button;
    private MaterialResponseDTO material;
    private CollarResponseDTO collar;
    private SleeveResponseDTO sleeve;
    private PatternResponseDTO pattern;
    private FormResponseDTO form;
    private SizeResponseDTO size;
    private ColorResponseDTO color;
    private ShirtTailTypeResponseDTO shirtTail;
    private BigDecimal price;
    private Float weight;
    private Integer quantity;
    private String descriptionDetail;
    private String status;
    private List<PromotionProductResponse> promotion;
    private List<ProductImageResponse> productImageResponse;

    public ProductDetailSellResponse(ProductDetailDisplayResponse productDetailDisplayResponse) {
        this.id = productDetailDisplayResponse.getId();
        this.product = new ProductResponseDTO(productDetailDisplayResponse.getProduct());
        this.brand = new BrandResponseDTO(productDetailDisplayResponse.getBrand());
        this.category = new CategoryResponseDTO(productDetailDisplayResponse.getCategory());
        this.button = new ButtonTypeResponseDTO(productDetailDisplayResponse.getButton());
        this.material = new MaterialResponseDTO(productDetailDisplayResponse.getMaterial());
        this.collar = new CollarResponseDTO(productDetailDisplayResponse.getCollar());
        this.sleeve = new SleeveResponseDTO(productDetailDisplayResponse.getSleeve());
        this.pattern = new PatternResponseDTO(productDetailDisplayResponse.getPattern());
        this.form = new FormResponseDTO(productDetailDisplayResponse.getForm());
        this.size = new SizeResponseDTO(productDetailDisplayResponse.getSize());
        this.color = new ColorResponseDTO(productDetailDisplayResponse.getColor());
        this.shirtTail = new ShirtTailTypeResponseDTO(productDetailDisplayResponse.getShirtTail());
        this.price = productDetailDisplayResponse.getPrice();
        this.weight = productDetailDisplayResponse.getWeight();
        this.quantity = productDetailDisplayResponse.getQuantity();
        this.descriptionDetail = productDetailDisplayResponse.getDescriptionDetail();
        this.status = productDetailDisplayResponse.getStatus();
        this.productImageResponse = productDetailDisplayResponse.getProductImageResponse();
    }
}
