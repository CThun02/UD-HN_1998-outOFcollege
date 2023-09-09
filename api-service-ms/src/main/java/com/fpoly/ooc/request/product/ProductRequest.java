package com.fpoly.ooc.request.product;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



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

    public Product dto(){
        return new Product(id, productCode, productName, description, "Active",
                Category.builder().id(categoryId).build(), Brand.builder().id(brandId).build());
    }
}