package com.fpoly.ooc.request.Product;

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
    private Boolean status;

    public Product dto(){
        return new Product(id, productCode, productName, description, status==true?"Active":"InActive",
                Category.builder().id(categoryId).build(), Brand.builder().id(brandId).build());
    }
}
