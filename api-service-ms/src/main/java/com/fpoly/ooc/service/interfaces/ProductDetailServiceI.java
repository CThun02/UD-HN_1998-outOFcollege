package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.ProductDetailsDTO;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public List<Color> getColorsBydIdPro(Long productId);
    public List<Size> getSizesBydIdPro(Long productId);
    public List<ShirtTailType> getShirtTailsBydIdPro(Long productId);
    public List<Material> getMaterialsBydIdPro(Long productId);
    public List<CollarType> getCollarsBydIdPro(Long productId);
    public List<ButtonType> getButtonsBydIdPro(Long productId);
    public List<SleeveType> getSleevesBydIdPro(Long productId);
    ProductDetail findById(Long id);
    List<Long> findAllIdsResponseProductDetails(Long idPromotion);
    List<ProductsDetailsResponse> findListProductdetailsByListProductId(ProductDetailsDTO productDetailsDTO);
    public Integer updateProductDetailsByCom(Long productId, Long idButton, Long idMaterial,
                                             Long idShirtTail, Long idSleeve, Long idCollar,
                                             Long idColor, Long idSize, String status);
}
