package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.product.ProductDetailCondition;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/client/product")
public class HomeController {

    private ProductDetailServiceI productDetailService;
    private ProductServiceI productService;

    @PostMapping("/by-product-details-dto")
    public ResponseEntity<?> findProuctDetailsByListIdProduct(
            @RequestBody ProductDetailsDTO dto
    ) {
        return ResponseEntity.ok(productDetailService.findListProductdetailsByListProductId(dto));
    }

    @GetMapping("/best-selling")
    public ResponseEntity<?> getBestSellingProduct() {
        return ResponseEntity.ok(productDetailService.getProductDetailBestSelling());
    }

    @GetMapping("/new-product")
    public ResponseEntity<?> getNewProduct() {
        return ResponseEntity.ok(productDetailService.getNewProductDetail());
    }

    @PostMapping("/product-shop")
    public ResponseEntity<?> findAllProductDetailShop(
            @RequestBody ProductDetailCondition req
    ) {
        return ResponseEntity.ok(productDetailService.getAllProductDetailShop(req));
    }

    @GetMapping("/get-price-max")
    public ResponseEntity<?> getPriceMax() {
        return ResponseEntity.ok(productDetailService.getPriceMax());
    }

    @PostMapping("/details-product")
    public ResponseEntity<?> getProductDetail(@RequestBody GetSizeAndColorRequest req) throws NotFoundException {
        return ResponseEntity.ok(productDetailService.getProductDetailsShop(req));
    }

    @PostMapping("/colors-and-sizes")
    public ResponseEntity<?> getSizesAndColors(@RequestBody GetSizeAndColorRequest req) throws NotFoundException {
        return ResponseEntity.ok(productDetailService.getColorAndSize(req));
    }

}
