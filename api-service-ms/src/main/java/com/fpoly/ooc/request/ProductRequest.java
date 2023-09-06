package com.fpoly.ooc.request;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.service.impl.BrandServiceImpl;
import com.fpoly.ooc.service.impl.CategoryServiceImpl;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.text.SimpleDateFormat;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Long id;
    private Long brandId;
    private Long categoryId;
    private String code;
    private String productName;
    private String description;
    private Boolean status;

    public Product dto(){
        return new Product(id, code, productName, description, status==true?"Active":"InActive",
                null, null, null, null, null,
                Category.builder().id(categoryId).build(), Brand.builder().id(brandId).build());
    }
}
