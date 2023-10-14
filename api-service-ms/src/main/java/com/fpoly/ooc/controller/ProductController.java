package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.dto.ProductDetailsDTO;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    public ProductController(ProductServiceI service, ProductDetailServiceI productDetailService) {
        this.service = service;
        this.productDetailService = productDetailService;
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
                                         @RequestParam Optional<Long> patternId,
                                         @RequestParam Optional<Long> formId,
                                         @RequestParam Optional<String> status
    ) {
        if (status.get().equals("ALL") || status.get().equals("")) {
            return ResponseEntity.ok(service.getProductFilterByCom(brandId.orElse(null), categoryId.orElse(null),
                    patternId.orElse(null), formId.orElse(null), null));
        } else {
            return ResponseEntity.ok(service.getProductFilterByCom(brandId.orElse(null), categoryId.orElse(null),
                    patternId.orElse(null), formId.orElse(null), status.orElse(null)));
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

    @GetMapping("/searchProductDetail")
    public ResponseEntity<?> searchProductDetail(@RequestParam String keyWords) {
        return ResponseEntity.ok(productDetailService.searchByCodeOrName(keyWords));
    }

    @GetMapping("/getProductDetailsTableByIdProduct")
    public List<ProductDetailResponse> getProductDetailsByIdPro(@RequestParam("productId") Long productId, @RequestParam String status) {
        return productDetailService.getProductDetailsTableByIdProduct(productId, status);
    }

    @GetMapping("/getProductEdit")
    public ProductResponse getProductEdit(@RequestParam("productId") Long productId) {
        return service.getProductResponseById(productId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
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
                    .price(request.getPrice())
                    .descriptionDetail(request.getDescriptionDetail())
                    .quantity(request.getQuantity())
                    .build();
            productDetail.setStatus(Const.STATUS_ACTIVE);
            productDetail = productDetailService.update(productDetail);
            return ResponseEntity.ok("update");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request) {
        Product product = request.dto();
        return ResponseEntity.ok(service.update(product));
    }


    @PutMapping("/updateProductStatus")
    public ResponseEntity<?> updateProductStatus(@RequestParam Long productId, @RequestParam String status) {
        Product product = service.getOne(productId);
        product.setStatus(status);
        return ResponseEntity.ok(service.update(product));
    }

    @PutMapping("/updateProductDetail")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetail request,
                                                 @RequestParam(name = "method", defaultValue = "Update") String method) {
        if (method.equals("Deleted")) {
            if (request.getStatus().equals("DELETED")) {
                request.setDeletedAt(LocalDateTime.now());
            } else {
                request.setDeletedAt(null);
            }
        } else {
            request.setDeletedAt(null);
        }
        return ResponseEntity.ok(productDetailService.update(request));
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
