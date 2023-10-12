package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
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
    public ResponseEntity<?> getAllProductDetail(){
            return ResponseEntity.ok(productDetailService.getAll());
    }

    @GetMapping("/getProductCreateDetail")
    public ResponseEntity<?> getProductCreateDetail(){
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

    @GetMapping("/filterProductDetailByIdCom")
    public ResponseEntity<?> filterProductDetailByIdCom(@RequestParam Optional<Long> productId,
                                                        @RequestParam Optional<Long> buttonId,
                                                        @RequestParam Optional<Long> materialId,
                                                        @RequestParam Optional<Long> shirtTailId,
                                                        @RequestParam Optional<Long> sleeveId,
                                                        @RequestParam Optional<Long> collarId,
                                                        @RequestParam Optional<Long> colorId,
                                                        @RequestParam Optional<Long> sizeId) {
        return ResponseEntity.ok(productDetailService.filterProductDetailsByIdCom
                (productId.orElse(null), buttonId.orElse(null), materialId.orElse(null), shirtTailId.orElse(null),
                        sleeveId.orElse(null), collarId.orElse(null), colorId.orElse(null), sizeId.orElse(null)));
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

    @GetMapping("/getProductDetailsTableByIdProduct")
    public List<ProductDetailResponse> getProductDetailsByIdPro(@RequestParam("productId")Long productId, @RequestParam String status){
        return productDetailService.getProductDetailsTableByIdProduct(productId, status.equals("")? null: status);
    }

    @GetMapping("/getProductDetailByProductId")
    public List<?> getProductDetailByProductId(@RequestParam("productId")Long productId){
        return productDetailService.getProductDetailsByIdProduct(productId);
    }

    @GetMapping("/getProductImageByProductId")
    public List<?> getProductImageByProductId(@RequestParam("productId")Long productId){
        return productImageService.getProductImageByProductId(productId);
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId")Long productId){
        return service.getProductResponseById(productId);
    }

    @GetMapping("/getProductDetailEachComByProductId")
    public ResponseEntity<?>  getProductDetailEachComByProductId(@RequestParam("productId")Long productId,
                                                                 @RequestParam("comsName")String comsName){
        List<?> list = new ArrayList<>();
        switch (comsName){
            case "button":{
                list = productDetailService.getButtonsBydIdPro(productId);
                break;
            }
            case "material":{
                list = productDetailService.getMaterialsBydIdPro(productId);
                break;
            }
            case "sleeve":{
                list = productDetailService.getSleevesBydIdPro(productId);
                break;
            }
            case "collar":{
                list = productDetailService.getCollarsBydIdPro(productId);
                break;
            }
            case "shirtTail":{
                list = productDetailService.getShirtTailsBydIdPro(productId);
                break;
            }
            case "size":{
                list = productDetailService.getSizesBydIdPro(productId);
                break;
            }
            case "color":{
                list = productDetailService.getColorsBydIdPro(productId);
                break;
            }
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        product.setId(null);
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
        }
        return ResponseEntity.ok(productDetailResponse);

    }

    @PostMapping("/createProductImg")
    public ResponseEntity<?> createProductImg(@RequestBody ProductImageRequest request){
        ProductImage productImage = request.dto();
        return ResponseEntity.ok(productImageService.create(productImage));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request){
        Product product = request.dto();
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }


    @PutMapping("/updateProductStatus")
    public ResponseEntity<?> updateProductStatus(@RequestParam Long productId, @RequestParam String status){
        Product product = service.getOne(productId);
        product.setStatus(status);
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }

    @PutMapping("/updateProductDetail")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetailRequest request,
                                                 @RequestParam(name = "method", defaultValue = "Update") String method){
        ProductDetail productDetail = request.dto();
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
}
