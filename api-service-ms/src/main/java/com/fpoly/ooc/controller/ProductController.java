package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.request.ProductRequest;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.product.ProductTableResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin/product")
public class ProductController {
    private ProductServiceI service;
    private ProductDetailServiceI productDetailService;

    @Autowired
    public ProductController(ProductServiceI service, ProductDetailServiceI productDetailService) {
        this.service = service;
        this.productDetailService = productDetailService;
    }

    @GetMapping("")
    public List<ProductTableResponse> getProductsTable(@RequestParam(name = "page", defaultValue = "0")Integer page){
        return service.getProductsTable(page).getContent();
    }

    @GetMapping("/getProductDetailsTableByIdProduct")
    public List<ProductDetailResponse> getProductDetailsByIdPro(@RequestParam("productId")Long productId){
        return productDetailService.getProductDetailsTableByIdProduct(productId);
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId")Long productId){
        return service.getProductResponseById(productId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        product.setStatus(Const.STATUS_ACTIVE);
        return ResponseEntity.ok(service.create(product));
    }

}
