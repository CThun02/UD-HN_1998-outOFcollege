package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailResponse> getAll();
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro);
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro, String status);
    public ProductDetailResponse getOneByIdCom
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize);
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial,
                                                                   Long idShirtTail, Long idSleeve, Long idCollar,
                                                                   Long idColor, Long idSize);
    public List<ProductDetailResponse> searchByCodeOrName(String keyWords);
    public List<Long> getColorsBydIdPro(Long productId);
    public List<Long> getSizesBydIdPro(Long productId);
    public List<Long> getShirtTailsBydIdPro(Long productId);
    public List<Long> getMaterialsBydIdPro(Long productId);
    public List<Long> getCollarsBydIdPro(Long productId);
    public List<Long> getButtonsBydIdPro(Long productId);
    public List<Long> getSleevesBydIdPro(Long productId);

}
