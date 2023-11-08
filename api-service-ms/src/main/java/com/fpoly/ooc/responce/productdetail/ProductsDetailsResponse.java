package com.fpoly.ooc.responce.productdetail;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.entity.SleeveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDetailsResponse {
    private Long productDetailsId;
    private String productCode;
    private String productName;
    private String imageDefault;
    private String buttonTypeName;
    private String materialType;
    private String collarType;
    private String sleeveType;
    private String size;
    private String color;
    private String shirtTailType;
    private BigDecimal price;
    private Integer quantity;
    private String descriptionDetail;
    private String status;
    private Boolean isCheckExistsInPromotion;

    public ProductsDetailsResponse(Long productDetailsId, String productCode, String productName,
                                   String buttonTypeName, String materialType, String collarType,
                                   String sleeveType, String size, String color, String shirtTailType,
                                   BigDecimal price, Integer quantity, String descriptionDetail, String status,
                                   Boolean isCheckExistsInPromotion) {
        this.productDetailsId = productDetailsId;
        this.productCode = productCode;
        this.productName = productName;
        this.buttonTypeName = buttonTypeName;
        this.materialType = materialType;
        this.collarType = collarType;
        this.sleeveType = sleeveType;
        this.size = size;
        this.color = color;
        this.shirtTailType = shirtTailType;
        this.price = price;
        this.quantity = quantity;
        this.descriptionDetail = descriptionDetail;
        this.status = status;
        this.isCheckExistsInPromotion = isCheckExistsInPromotion;
    }
}
