package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.responce.product.ProductDetailResponse;

import java.util.List;
public interface ProductDetailServiceI {
    public ProductDetail create(ProductDetail productDetail);
    public ProductDetail update(ProductDetail productDetail);
    public Boolean delete(Long id);
    public ProductDetail getOne(Long id);
    public List<ProductDetailResponse> getAll();
    public List<ProductDetailResponse> getProductDetailsByIdProduct(Long idPro);
    public List<ProductDetailResponse> getProductDetailsTableByIdProduct(Long idPro, String status);
    public List<ProductDetailResponse> getProductDetailsResponseByIdCompo
            (Long id, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar);
    public List<Color> getColorsByIdCompoPDAndIdPro
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar);
    public List<ProductDetailResponse> getSizesPDByIdCompoPDAndIdPro
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor);
    public ProductDetailResponse getOneByIdCom
            (Long productId, Long idButton, Long idMaterial, Long idShirtTail, Long idSleeve, Long idCollar, Long idColor, Long idSize);
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial,
                                                                   Long idShirtTail, Long idSleeve, Long idCollar,
                                                                   Long idColor, Long idSize);
    public List<ProductDetailResponse> searchByCodeOrName(String keyWords);

    ProductDetail findById(Long id);

    List<Long> findAllResponseProduct(Long idPromotion);

}
