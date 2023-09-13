package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.request.product.ProductDetailColorSizeRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.product.ProductRequest;
import com.fpoly.ooc.responce.product.*;
import com.fpoly.ooc.service.impl.FileMangerService;
import com.fpoly.ooc.service.impl.ProductDetailServiceImpl;
import com.fpoly.ooc.service.impl.ProductImageService;
import com.fpoly.ooc.service.impl.ProductServiceImpl;
import jakarta.websocket.server.PathParam;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin/api/product")
public class ProductController {
    private ProductServiceImpl service;
    private ProductDetailServiceImpl productDetailService;
    private FileMangerService fileMangerService;
    private ProductImageService productImageService;

    public ProductController(ProductServiceImpl service, ProductDetailServiceImpl productDetailService,
                             FileMangerService fileMangerService, ProductImageService productImageService) {
        this.service = service;
        this.productDetailService = productDetailService;
        this.fileMangerService = fileMangerService;
        this.productImageService = productImageService;
    }

    @GetMapping("/files/{folder}/{file}")
    public byte[] dowload(@PathVariable("folder")String folder, @PathVariable("file")String file){
        return fileMangerService.read(folder, file);
    }

    @PostMapping("/files/{idpro}")
    public List<String> upload(@PathVariable("idpro")String folder, @PathParam("files") MultipartFile[] files){
        List<String> fileNames =  fileMangerService.save(folder, files);
        this.setProductImageDefault(Long.valueOf(folder), fileNames.get(0));
        for (String fileName:fileNames) {
            ProductImage productImage = new ProductImage(null,Product.builder().id(Long.valueOf(folder)).build(),
                    fileName, "Active" );
            productImageService.create(productImage);
        }
        return fileNames;
    }

    @DeleteMapping("/files/{folder}/{file}")
    public void delete(@PathVariable("folder")String folder, @PathVariable("file")String file){
        fileMangerService.delete(folder, file);
        ProductImage productImage = productImageService.getProductImagesByProductAndPath
                (Product.builder().id(Long.valueOf(folder)).build(), file);
        productImageService.delete(productImage);
    }

    @GetMapping("/files/{idpro}")
    public List<String> list(@PathVariable("idpro")Long idpro){
        List<String> fileNames = new ArrayList<>();
        List<ProductImage> productImages = productImageService.getProductImagesByProduct(Product.builder().id(idpro).build());
        for (ProductImage productImage: productImages) {
            fileNames.add(productImage.getPath());
        }
        return fileNames;
    }
    //end

    @GetMapping("/data")
    public List<?> getProducts(@RequestParam(name = "page", defaultValue = "0") int page){
        Page<ProductResponse> getPage = service.pageIndex(page);
        return getPage.getContent();
    }

    @GetMapping("/total")
    public Integer getTotalPage(){
        return service.pageIndex(0).getTotalPages();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getProductDetailDefault(@PathVariable Long id){
        return ResponseEntity.ok(productDetailService.getProductDetail(id));
    }

    @GetMapping("/detailStatus")
    public ResponseEntity<?> getProductDetailByStatus(@RequestParam Long id, @RequestParam Boolean status){
        return ResponseEntity.ok(productDetailService.getProductDetailByStatus(id, status==true?"Active":"InActive"));
    }
    @GetMapping("/detailcolorsize")
    public List<?> getProductDetailColorSizeByIdP(@RequestParam Long productId){
        return productDetailService.getProductDetailColorSizeByIdP(productId);
    }

    @GetMapping("/getallproductdetail")
    public List<?> getAllProductDetail(){
        return productDetailService.getAllProductDetailResponse();
    }

    @GetMapping("/detailcolorbyidsizenidpro")
    public ProductDetailSizeResponse getProductDetailColorSizeByIdPAndSizeId(@RequestParam Long productId, @RequestParam Long sizeId){
        return productDetailService.getProductDetailColorSizeByIdPNIdSize(productId, sizeId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductEdit(@PathVariable Long id){
        return ResponseEntity.ok(service.getProductEdit(id));
    }

    @GetMapping("/detailbyidpro/{id}")
    public ResponseEntity<?> getProductDetailByIdPro(@PathVariable Long id){
        return ResponseEntity.ok(productDetailService.getProductDetailsByIdPro(id));
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

    @PutMapping("/setproductimagedefault")
    public ResponseEntity<?> setProductImageDefault(@RequestParam(name = "id") Long id, @RequestBody String path){
        Product product = service.getOne(id);
        product.setImgDefault(path);
        return ResponseEntity.ok(service.update(product));
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
