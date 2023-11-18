package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.ProductDetailsDTO;
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

    @GetMapping("/promotion")
    public ResponseEntity<?> findProductPromotion() {
        return ResponseEntity.ok(productService.findProductPromotion());
    }

    @PostMapping("/by-product-details-dto")
    public ResponseEntity<?> findProuctDetailsByListIdProduct(
            @RequestBody ProductDetailsDTO dto
    ) {
        return ResponseEntity.ok(productDetailService.findListProductdetailsByListProductId(dto));
    }

    @GetMapping("/best-selling")
    public ResponseEntity<?> getBestSellingProduct() {
        System.out.println("best");
        return ResponseEntity.ok(productDetailService.getProductDetailBestSelling());
    }

    @GetMapping("/new-product")
    public ResponseEntity<?> getNewProduct() {
        return ResponseEntity.ok(productDetailService.getNewProductDetail());
    }

    @PostMapping("/product-shop")
    public ResponseEntity<?> findAllProductDetailShop(
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "12") int pageSize,
            @RequestBody ProductDetailCondition req
    ) {

        return ResponseEntity.ok(
                productDetailService.getAllProductDetailShop(
                        req, PageRequest.of(pageNo, pageSize))
        );
    }

    @GetMapping("/get-price-max")
    public ResponseEntity<?> getPriceMax() {
        return ResponseEntity.ok(productDetailService.getPriceMax());
    }

    @PostMapping("/details-product")
    public ResponseEntity<?> getProductDetail(@RequestBody GetSizeAndColorRequest req) {
        return ResponseEntity.ok(productDetailService.getProductDetailsShop(req));
    }

    @PostMapping("/colors-and-sizes")
    public ResponseEntity<?> getSizesAndColors(@RequestBody GetSizeAndColorRequest req) {
        return ResponseEntity.ok(productDetailService.getColorAndSize(req));
    }

}
