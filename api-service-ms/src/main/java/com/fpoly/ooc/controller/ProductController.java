package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ProductImage;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.product.ProductImageRequest;
import com.fpoly.ooc.request.product.ProductRequest;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/admin/product")
public class ProductController {
    private ProductServiceI service;
    private ProductDetailServiceI productDetailService;
    private ProductImageServiceI productImageService;

    @Autowired
    public ProductController(ProductServiceI service, ProductDetailServiceI productDetailService, ProductImageServiceI productImageService) {
        this.service = service;
        this.productDetailService = productDetailService;
        this.productImageService = productImageService;
    }

    @GetMapping("/getAllProductDetail")
    public ResponseEntity<?> getAllProductDetail() {
        return ResponseEntity.ok(productDetailService.getAll());
    }

    @GetMapping("/getProductCreateDetail")
    public ResponseEntity<?> getProductCreateDetail() {
        return ResponseEntity.ok(service.getProductCreateDetail("ACTIVE"));
    }

    @GetMapping("/filterByCom")
    public ResponseEntity<?> filterByCom(@RequestParam Optional<Long> brandId,
                                         @RequestParam Optional<Long> categoryId,
                                         @RequestParam Optional<String> status
                                         ){
        if(status.get().equals("ALL") || status.get().equals("")){
            return ResponseEntity.ok(service.getProductFilterByCom(brandId.orElse(null), categoryId.orElse(null),null));
        }else{
            return ResponseEntity.ok(service.getProductFilterByCom(brandId.orElse(null), categoryId.orElse(null), status.orElse(null)));
        }
    }

    @GetMapping("/getMaxPrice")
    public ResponseEntity<?> getMaxPrice(@RequestParam Long productId){
        return ResponseEntity.ok(productDetailService.getMaxPricePDByProductId(productId));
    }

    @GetMapping("/filterProductDetailByIdCom")
    public ResponseEntity<?> filterProductDetailByIdCom(@RequestParam Optional<Long> productId,
                                                        @RequestParam Optional<Long> buttonId,
                                                        @RequestParam Optional<Long> materialId,
                                                        @RequestParam Optional<Long> shirtTailId,
                                                        @RequestParam Optional<Long> sleeveId,
                                                        @RequestParam Optional<Long> collarId,
                                                        @RequestParam Optional<Long> patternId,
                                                        @RequestParam Optional<Long> formId,
                                                        @RequestParam Optional<Long> colorId,
                                                        @RequestParam Optional<Long> sizeId,
                                                        @RequestParam Optional<BigDecimal> minPrice,
                                                        @RequestParam Optional<BigDecimal> maxPrice) {
        return ResponseEntity.ok(productDetailService.filterProductDetailsByIdCom
                (productId.orElse(null), buttonId.orElse(null), materialId.orElse(null), shirtTailId.orElse(null),
                        sleeveId.orElse(null), collarId.orElse(null), colorId.orElse(null), sizeId.orElse(null),
                        patternId.orElse(null), formId.orElse(null), minPrice.orElse(null), maxPrice.orElse(null)));
    }

    @PutMapping("/updateProductDetailsByCom")
    public ResponseEntity<?> updateProductDetailsByCom(@RequestParam Optional<Long> productId,
                                                        @RequestParam Optional<Long> buttonId,
                                                        @RequestParam Optional<Long> materialId,
                                                        @RequestParam Optional<Long> shirtTailId,
                                                        @RequestParam Optional<Long> sleeveId,
                                                        @RequestParam Optional<Long> collarId,
                                                        @RequestParam Optional<Long> colorId,
                                                        @RequestParam Optional<Long> sizeId,
                                                       @RequestParam String status) {
        return ResponseEntity.ok(productDetailService.updateProductDetailsByCom
                (productId.orElse(null), buttonId.orElse(null), materialId.orElse(null), shirtTailId.orElse(null),
                        sleeveId.orElse(null), collarId.orElse(null), colorId.orElse(null),
                        sizeId.orElse(null), status));
    }

    @GetMapping("/searchProductDetail")
    public ResponseEntity<?> searchProductDetail(@RequestParam String keyWords) {
        return ResponseEntity.ok(productDetailService.searchByCodeOrName(keyWords));
    }

    @GetMapping("/getProductImageByProductId")
    public List<?> getProductImageByProductId(@RequestParam("productId")Long productId){
        return productImageService.getProductImageByProductId(productId);
    }

    @GetMapping("/getProductImageDefaultByProductId")
    public List<?> getProductImageDefaultByProductId(@RequestParam("productId")Long productId){
        return productImageService.getProductImageDefaultByProductId(productId);
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId") Long productId) {
        return service.getProductResponseById(productId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        Product product = request.dto();
        product.setId(null);
        product.setStatus(Const.STATUS_ACTIVE);
        return ResponseEntity.ok(service.create(product));
    }

    @PostMapping("/createDetail")
    public ResponseEntity<?> createProductDetail(@RequestBody ProductDetailRequest request) {
        List<ProductDetailResponse> productDetailResponse = productDetailService.filterProductDetailsByIdCom(request.getProductId(), request.getButtonId(),
                request.getMaterialId(), request.getShirtTailId(), request.getSleeveId(), request.getCollarId(),
                request.getColorId(), request.getSizeId(), request.getPatternId(), request.getFormId(), null,
                null);
        if (productDetailResponse.isEmpty()) {
            ProductDetail productDetail = request.dto();
            productDetail = productDetailService.create(productDetail);
        }
        return ResponseEntity.ok(productDetailResponse);
    }

    @PostMapping("/createProductImg")
    public ResponseEntity<?> createProductImg(@RequestBody ProductImageRequest request){
        ProductImage productImage = request.dto();
        return ResponseEntity.ok(productImageService.create(productImage));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request) {
        Product product = request.dto();
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }


    @PutMapping("/updateProductStatus")
    public ResponseEntity<?> updateProductStatus(@RequestParam Long productId, @RequestParam String status) {
        Product product = service.getOne(productId);
        product.setStatus(status);
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }

    @PutMapping("/updateProductDetail")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetail productDetail,
                                                 @RequestParam(name = "method", defaultValue = "Update") String method){
        if(method.equals("Deleted")){
            if(productDetail.getStatus().equals("DELETED")){
                productDetail.setDeletedAt(LocalDateTime.now());
            }else{
                productDetail.setDeletedAt(null);
            }
        }else{
            productDetail.setDeletedAt(null);
        }
        return ResponseEntity.ok(productDetailService.update(productDetail));
    }

    @DeleteMapping("/deleteProductImage")
    public ResponseEntity<?> deleteProductImage(@RequestParam Long id){
        ProductImage productImage = productImageService.getOne(id);
        productImageService.delete(productImage);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/promotion")
    public ResponseEntity<?> findProductPromotion(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize
    ) {
        return ResponseEntity.ok(service.findProductPromotion(PageRequest.of(pageNo, pageSize)));
    }

    @PostMapping("/by-product-details-dto")
    public ResponseEntity<?> findProuctDetailsByListIdProduct(
            @RequestBody ProductDetailsDTO dto
    ) {
        return ResponseEntity.ok(productDetailService.findListProductdetailsByListProductId(dto));
    }

}
