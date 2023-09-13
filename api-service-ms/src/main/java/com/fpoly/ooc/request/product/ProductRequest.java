package com.fpoly.ooc.request.product;

import com.fpoly.ooc.entity.BaseEntity;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Long id;
    private Long brandId;
    private Long categoryId;
    private String productCode;
    private String productName;
    private String description;
    private Boolean status;
    private LocalDateTime createdAt;
    private String imgDefault;
    private String createdBy;

    public Product dto(){
        Product product = new Product(id, productCode, productName, description, status==null?"Active":status==true?"Active":"InActive",
                imgDefault,Category.builder().id(categoryId).build(), Brand.builder().id(brandId).build());
        product.setCreatedAt(createdAt);
        product.setCreatedBy(createdBy);
        return product;
    }
}
