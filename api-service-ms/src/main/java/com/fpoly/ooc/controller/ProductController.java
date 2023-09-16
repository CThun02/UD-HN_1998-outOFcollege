package com.fpoly.ooc.controller;

import com.fpoly.ooc.responce.product.ProductTableResponse;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin/product")
public class ProductController {
    @Autowired
    private ProductServiceI service;

    @GetMapping("")
    public List<ProductTableResponse> getProductsTable(@RequestParam(name = "page", defaultValue = "0")Integer page){
        return service.getProductsTable(page).getContent();
    }

}
