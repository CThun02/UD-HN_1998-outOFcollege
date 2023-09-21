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
import java.util.Optional;

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
    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestParam Long productId,
                                                       @RequestParam Long buttonId,
                                                       @RequestParam Long materialId,
                                                       @RequestParam Long shirtTailId,
                                                       @RequestParam Long sleeveId,
                                                       @RequestParam Long collarId,
                                                       @RequestParam Long colorId,
                                                       @RequestParam Long sizeId){
        return  ResponseEntity.ok(1);
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
    public ResponseEntity<?> createProductDetail(@RequestBody ProductDetailRequest request) {
        ProductDetailResponse productDetailResponse = productDetailService.getOneByIdCom(request.getProductId(), request.getButtonId(),
                request.getMaterialId(), request.getShirtTailId(), request.getSleeveId(), request.getCollarId(),
                request.getColorId(), request.getSizeId());

        if (productDetailResponse == null) {
            ProductDetail productDetail = request.dto();
            productDetail.setStatus(Const.STATUS_ACTIVE);
            productDetail = productDetailService.create(productDetail);
            return ResponseEntity.ok(productDetail);
        } else {
            ProductDetail productDetail = ProductDetail.builder()
                    .id(productDetailResponse.getId())
                    .product(productDetailResponse.getProduct())
                    .button(productDetailResponse.getButton())
                    .material(productDetailResponse.getMaterial())
                    .collar(productDetailResponse.getCollar())
                    .sleeve(productDetailResponse.getSleeve())
                    .size(productDetailResponse.getSize())
                    .color(productDetailResponse.getColor())
                    .shirtTail(productDetailResponse.getShirtTail())
                    .price(productDetailResponse.getPrice())
                    .descriptionDetail(productDetailResponse.getDescriptionDetail())
                    .quantity(productDetailResponse.getQuantity() + request.getQuantity())
                    .build();
            productDetail.setStatus(Const.STATUS_ACTIVE);
            productDetail = productDetailService.update(productDetail);
            return ResponseEntity.ok(productDetail);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        return ResponseEntity.ok(service.update(product));
    }

    @PutMapping("/updateProductDetail")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetail request){
        return ResponseEntity.ok(productDetailService.update(request));
    }
}
