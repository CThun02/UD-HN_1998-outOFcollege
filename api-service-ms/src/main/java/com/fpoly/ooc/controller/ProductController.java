package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.request.ProductDetailColorSizeRequest;
import com.fpoly.ooc.request.ProductDetailRequest;
import com.fpoly.ooc.request.ProductRequest;
import com.fpoly.ooc.responce.ProductDetailColorSizeResponse;
import com.fpoly.ooc.responce.ProductDetailResponse;
import com.fpoly.ooc.responce.ProductResponse;
import com.fpoly.ooc.responce.ProductResponseEdit;
import com.fpoly.ooc.service.impl.ColorServiceImpl;
import com.fpoly.ooc.service.impl.ProductDetailServiceImpl;
import com.fpoly.ooc.service.impl.ProductServiceImpl;
import com.fpoly.ooc.service.impl.SizeServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/product")
public class ProductController {

    private ProductServiceImpl service;
    private ProductDetailServiceImpl productDetailService;
    private ColorServiceImpl colorService;
    private SizeServiceImpl sizeService;
    private HttpServletResponse response;

    @Autowired
    public ProductController(ProductServiceImpl service, ProductDetailServiceImpl productDetailService, ColorServiceImpl colorService, SizeServiceImpl sizeService) {
        this.service = service;
        this.productDetailService = productDetailService;
        this.colorService = colorService;
        this.sizeService = sizeService;
    }

    @GetMapping("/data")
    public List<ProductResponse> getProducts(@RequestParam(name = "page", defaultValue = "0") int page){
        Page<ProductResponse> getPage = service.pageIndex(page);
        return getPage.getContent();
    }

    @GetMapping("/total")
    public Integer getTotalPage(){
        return service.pageIndex(0).getTotalPages();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetail(@PathVariable Long id){
        return ResponseEntity.ok(productDetailService.getProductDetail(id));
    }


    @GetMapping("/detailcolorsize/{id}")
    public List<ProductDetailColorSizeResponse> getProductDetailColorSize(@PathVariable Long id){
        return productDetailService.getProductDetailColorSizeByIdPD(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseEdit> getProductEdit(@PathVariable Long id){
        return ResponseEntity.ok(service.getProductEdit(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createproduct(@RequestBody ProductRequest request){
        return ResponseEntity.ok(service.create(request.dto()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateproduct(@RequestParam(name = "id") Long id, @RequestBody ProductRequest request){
        request.setId(id);
        return ResponseEntity.ok(service.update(request.dto()));
    }

    @PostMapping("/createproductdetail")
    public ResponseEntity<?> createproductDetail(@RequestBody ProductDetailRequest request){
        return ResponseEntity.ok(productDetailService.create(request.dto()));
    }

    @PostMapping("/createproductdetail/colorsize/{idprodetail}")
    public ResponseEntity<?> createproductDetailColorSize(@RequestBody List<ProductDetailColorSizeRequest> request, @PathVariable Long idprodetail){
        ProductDetail productDetail = productDetailService.getOne(idprodetail);
        for (ProductDetailColorSizeRequest item:request) {
            ProductDetail productDetailCreate = ProductDetail.builder().product(productDetail.getProduct())
                    .pattern(productDetail.getPattern()).button(productDetail.getButton())
                    .material(productDetail.getMaterial()).collar(productDetail.getCollar())
                    .sleeve(productDetail.getSleeve()).form(productDetail.getForm())
                    .shirtTail(productDetail.getShirtTail()).descriptionDetail(productDetail.getDescriptionDetail())
                    .status(productDetail.getStatus()).build();
            productDetailCreate.setColor(Color.builder().id(item.getColorId()).build());
            productDetailCreate.setSize(Size.builder().id(item.getSizeId()).build());
            productDetailCreate.setQuantity(item.getQuantity());
            productDetailCreate.setPrice(item.getPrice());
            productDetailService.create(productDetailCreate);
        }
        return ResponseEntity.ok("OK");
    }
}
