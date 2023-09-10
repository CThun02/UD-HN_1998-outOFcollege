package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.request.product.ProductDetailColorSizeRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.product.ProductRequest;
import com.fpoly.ooc.responce.product.*;
import com.fpoly.ooc.service.impl.ProductDetailServiceImpl;
import com.fpoly.ooc.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin/api/product")
public class ProductController {

    private ProductServiceImpl service;
    private ProductDetailServiceImpl productDetailService;

    @Autowired
    public ProductController(ProductServiceImpl service, ProductDetailServiceImpl productDetailService) {
        this.service = service;
        this.productDetailService = productDetailService;
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
    public ResponseEntity<ProductDetailResponse> getProductDetailDefault(@PathVariable Long id){
        return ResponseEntity.ok(productDetailService.getProductDetail(id));
    }

    @GetMapping("/detailStatus")
    public ResponseEntity<ProductDetailResponse> getProductDetailByStatus(@RequestParam Long id, @RequestParam Boolean status){
        return ResponseEntity.ok(productDetailService.getProductDetailByStatus(id, status==true?"Active":"InActive"));
    }
    @GetMapping("/detailcolorsize")
    public List<ProductDetailSizeResponse> getProductDetailColorSizeByIdP(@RequestParam Long productId){
        return productDetailService.getProductDetailColorSizeByIdP(productId);
    }

    @GetMapping("/getallproductdetail")
    public List<ProductDetailResponse> getAllProductDetail(){
        return productDetailService.getAllProductDetailResponse();
    }

    @GetMapping("/detailcolorbyidsizenidpro")
    public ProductDetailSizeResponse getProductDetailColorSizeByIdPAndSizeId(@RequestParam Long productId, @RequestParam Long sizeId){
        return productDetailService.getProductDetailColorSizeByIdPNIdSize(productId, sizeId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseEdit> getProductEdit(@PathVariable Long id){
        return ResponseEntity.ok(service.getProductEdit(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createproduct(@RequestBody ProductRequest request){
        return ResponseEntity.ok(service.create(request.dto()));
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
                    .status("Active").build();
            productDetailCreate.setColor(Color.builder().id(item.getColorId()).build());
            productDetailCreate.setSize(Size.builder().id(item.getSizeId()).build());
            productDetailCreate.setQuantity(item.getQuantity());
            productDetailCreate.setPrice(item.getPrice());
            productDetailService.create(productDetailCreate);
        }
        return ResponseEntity.ok("OK");
    }

    @PutMapping("/updateproductdetail")
    public ResponseEntity<?> updateProductDetailColorSize(@RequestBody ProductDetailRequest productDetail){
        return ResponseEntity.ok(productDetailService.update(productDetail.dto()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateproduct(@RequestParam(name = "id") Long id, @RequestBody ProductRequest request){
        request.setId(id);
        return ResponseEntity.ok(service.update(request.dto()));
    }

    @PutMapping("/updateproductdetails")
    public ResponseEntity<?> updateProductDetails( @RequestBody ProductDetailRequest request){
        productDetailService.update(request.dto());
        List<ProductDetail> productDetailListUpdate = productDetailService.getProductDetailsByIdPro(request.getProductId());
        for (ProductDetail productDetail: productDetailListUpdate) {
            productDetail.setPattern(Pattern.builder().id(request.getPatternId()).build());
            productDetail.setButton(ButtonType.builder().id(request.getButtonId()).build());
            productDetail.setMaterial((Material.builder().id(request.getMaterialId()).build()) );
            productDetail.setShirtTail(ShirtTailType.builder().id(request.getShirtTailId()).build());
            productDetail.setCollar(CollarType.builder().id(request.getCollarId()).build());
            productDetail.setForm(Form.builder().id(request.getFormId()).build());
            productDetail.setSleeve(SleeveType.builder().id(request.getSleeveId()).build());
            productDetail.setDescriptionDetail(request.getDescriptionDetail());
            productDetailService.update(productDetail);
        }
        return ResponseEntity.ok("ok");
    }
}
