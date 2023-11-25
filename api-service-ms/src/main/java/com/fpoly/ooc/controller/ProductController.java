package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.request.product.ProductDetailCondition;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.product.ProductImageRequest;
import com.fpoly.ooc.request.product.ProductRequest;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductResponse;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    @GetMapping("/getproductfilterByCom")
    public ResponseEntity<?> filterByCom(@RequestParam(defaultValue = "null") String status,
                                         @RequestParam(defaultValue = "null") String keywords) {
        return ResponseEntity.ok(service.getProductFilterByCom(status.equals("null") ? null : status,
                keywords.equals("null") ? null : "%" + keywords + "%"));
    }

    @GetMapping("/getproductdetailbyidpd")
    public ResponseEntity<?> filterByCom(@RequestParam() Long productDetailId) {
        return ResponseEntity.ok(productDetailService.getOnePDDisplayById(productDetailId));
    }

    @GetMapping("/getMaxPrice")
    public ResponseEntity<?> getMaxPrice(@RequestParam Long productId) {
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
                                                        @RequestParam Optional<Long> brandId,
                                                        @RequestParam Optional<Long> categoryId,
                                                        @RequestParam Optional<Long> colorId,
                                                        @RequestParam Optional<Long> sizeId,
                                                        @RequestParam Optional<BigDecimal> minPrice,
                                                        @RequestParam Optional<BigDecimal> maxPrice) {
        ProductDetailRequest request = ProductDetailRequest.builder().productId(productId.orElse(null))
                .brandId(brandId.orElse(null)).buttonId(buttonId.orElse(null)).categoryId(categoryId.orElse(null))
                .collarId(collarId.orElse(null)).formId(formId.orElse(null)).patternId(patternId.orElse(null))
                .materialId(materialId.orElse(null)).shirtTailId(shirtTailId.orElse(null)).sleeveId(sleeveId.orElse(null))
                .colorId(colorId.orElse(null)).sizeId(sizeId.orElse(null)).build();
        return ResponseEntity.ok(productDetailService.filterProductDetailsByIdCom
                (request, minPrice.orElse(null), maxPrice.orElse(null)));
    }



    @GetMapping("/searchProductDetail")
    public ResponseEntity<?> searchProductDetail(@RequestParam String keyWords) {
        return ResponseEntity.ok(productDetailService.searchProductDetail(keyWords));
    }

    @GetMapping("/getAllProductImages")
    public List<?> getAllProductImages() {
        return productImageService.getAll();
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId") Long productId) {
        return service.getProductResponseById(productId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) throws JsonProcessingException {
        Product product = request.dto();
        product.setId(null);
        product.setStatus(Const.STATUS_ACTIVE);
        return ResponseEntity.ok(service.create(product));
    }

    @PostMapping("/createDetail")
    public ResponseEntity<?> createProductDetail(@RequestBody ProductDetailRequest request) throws JsonProcessingException {
        List<ProductDetailDisplayResponse> productDetailResponse = productDetailService.filterProductDetailsByIdCom(request,
                null, null);
        if (productDetailResponse.isEmpty()) {
            ProductDetail productDetail = request.dto();
            productDetail = productDetailService.create(productDetail);
            return ResponseEntity.ok(productDetail);
        }
        return null;
    }

    @PostMapping("/createProductImg")
    public ResponseEntity<?> createProductImg(@RequestBody ProductImageRequest request) {
        ProductImage productImage = request.dto();
        return ResponseEntity.ok(productImageService.create(productImage));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request) throws JsonProcessingException {
        Product product = request.dto();
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }

    @GetMapping("/promotion")
    public ResponseEntity<?> findProductPromotion() {
        return ResponseEntity.ok(service.findProductPromotion());
    }
    @PutMapping("/updateProductStatus")
    public ResponseEntity<?> updateProductStatus(@RequestParam Long productId,
                                                 @RequestParam String status,
                                                 @RequestParam(defaultValue = "false") Boolean openAll) throws JsonProcessingException {
        Product product = service.getOne(productId);
        if ((openAll && status.equals("ACTIVE")) || status.equals("INACTIVE")) {
            productDetailService.updateProductDetailsByProductId(productId, status);
        }
        product.setStatus(status);
        product.setDeletedAt(null);
        return ResponseEntity.ok(service.update(product));
    }

    @PutMapping("/updateProductDetail")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetail productDetail,
                                                 @RequestParam(name = "method", defaultValue = "Update") String method) throws JsonProcessingException {
        if (method.equals("Deleted")) {
            if (productDetail.getStatus().equals("DELETED")) {
                productDetail.setDeletedAt(LocalDateTime.now());
            } else {
                productDetail.setDeletedAt(null);
            }
        } else {
            productDetail.setDeletedAt(null);
        }
        ProductDetailRequest request = ProductDetailRequest.builder().productId(productDetail.getProduct().getId())
                .buttonId(productDetail.getButton().getId()).materialId(productDetail.getMaterial().getId())
                .collarId(productDetail.getCollar().getId()).sleeveId(productDetail.getSleeve().getId())
                .patternId(productDetail.getPattern().getId()).formId(productDetail.getForm().getId())
                .shirtTailId(productDetail.getShirtTail().getId()).sizeId(productDetail.getSize().getId())
                .colorId(productDetail.getColor().getId()).brandId(productDetail.getBrand().getId())
                .categoryId(productDetail.getCategory().getId()).build();
        List<ProductDetailDisplayResponse> check = productDetailService.filterProductDetailsByIdCom(request, null, null);
        Optional<ProductDetailDisplayResponse> result = check.stream()
                .filter(productDetailGet -> !productDetailGet.getId().equals(productDetail.getId()))
                .findFirst();
        if (!result.isEmpty()) {
            if (!(result.get().getId() == productDetail.getId())) {
                return ResponseEntity.ok(result.get());
            }
        }
        return ResponseEntity.ok(productDetailService.update(productDetail));
    }

    @PutMapping("/updateProductImg")
    public ResponseEntity<?> updateProductImg(@RequestBody ProductImage request) {
        ProductImage productImage = productImageService.update(request);
        return ResponseEntity.ok(productImage);
    }


    @DeleteMapping("/deleteProductImage")
    public ResponseEntity<?> deleteProductImage(@RequestParam Long id) {
        ProductImage productImage = productImageService.getOne(id);
        productImageService.delete(productImage);
        return ResponseEntity.ok("ok");
    }
}