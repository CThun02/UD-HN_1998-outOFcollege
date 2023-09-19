package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.product.ProductRequest;
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

    @GetMapping("/getProductDetailUpdate")
    public ResponseEntity<?> getProductDetailsUpdate(@RequestParam Long productId,
                                                               @RequestParam Long buttonId,
                                                               @RequestParam Long materialId,
                                                               @RequestParam Long shirtTailId,
                                                               @RequestParam Long sleeveId,
                                                               @RequestParam Long collarId){
        return  ResponseEntity.ok(productDetailService.getProductDetailsResponseByIdCompo(productId, buttonId,
                materialId, shirtTailId, sleeveId, collarId).get(0));
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId")Long productId){
        return service.getProductResponseById(productId);
    }

    @GetMapping("/getColorsByIdComPdAndIdPro")
    public ResponseEntity<?> getColorsByIdComPdAndIdPro(@RequestParam Long productId,
                                                     @RequestParam Long buttonId,
                                                     @RequestParam Long materialId,
                                                     @RequestParam Long shirtTailId,
                                                     @RequestParam Long sleeveId,
                                                     @RequestParam Long collarId){
        return  ResponseEntity.ok(productDetailService.getColorsByIdCompoPDAndIdPro(productId, buttonId,
                materialId, shirtTailId, sleeveId, collarId));
    }


    @GetMapping("/getSizesByIdComPdAndIdPro")
    public ResponseEntity<?> getSizesByIdComPdAndIdPro(@RequestParam Long productId,
                                                        @RequestParam Long buttonId,
                                                        @RequestParam Long materialId,
                                                        @RequestParam Long shirtTailId,
                                                        @RequestParam Long sleeveId,
                                                        @RequestParam Long collarId,
                                                       @RequestParam Long colorId){
        return  ResponseEntity.ok(productDetailService.getSizesPDByIdCompoPDAndIdPro(productId, buttonId,
                materialId, shirtTailId, sleeveId, collarId, colorId));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        product.setStatus(Const.STATUS_ACTIVE);
        return ResponseEntity.ok(service.create(product));
    }

    @PostMapping("/createDetail")
    public ResponseEntity<?> createProductDetail(@RequestBody ProductDetailRequest request){
        ProductDetail productDetail = request.dto();
        productDetail.setStatus(Const.STATUS_ACTIVE);
        return ResponseEntity.ok(productDetailService.create(productDetail));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        return ResponseEntity.ok(service.update(product));
    }

}
