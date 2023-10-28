package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button" +
            ", pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve" +
            ", pd.size AS size, pd.color AS color, pd.shirtTail AS shirtTail" +
            ", pd.price AS price, pd.weight as weight, pd.quantity AS quantity, pd.descriptionDetail AS descriptionDetail" +
            ", pd.pattern as pattern, pd.form as form, pd.status as status FROM ProductDetail pd " +
            "WHERE (pd.product.id = ?1 OR ?1 IS NULL) " +
            "AND (pd.button.id = ?2 OR ?2 IS NULL) AND (pd.material.id = ?3 OR ?3 IS NULL) " +
            "AND (pd.shirtTail.id = ?4 OR ?4 IS NULL) AND (pd.sleeve.id = ?5 OR ?5 IS NULL) " +
            "AND (pd.collar.id = ?6 OR ?6 IS NULL) AND (pd.color.id = ?7 OR ?7 IS NULL) " +
            "AND (pd.size.id = ?8 OR ?8 IS NULL) AND (pd.pattern.id = ?9 OR ?9 IS NULL)" +
            "AND (pd.form.id = ?10 OR ?10 IS NULL) AND (pd.brand.id = ?11 OR ?11 IS NULL)" +
            "AND (pd.category.id = ?12 OR ?12 IS NULL) AND ((pd.price >=?13 or ?13 IS NULL) " +
            "AND (pd.price<=?14 or ?14 IS NULL))")
    public List<ProductDetailResponse> filterProductDetailsByIdCom(Long productId, Long idButton, Long idMaterial,
                                                                   Long idShirtTail, Long idSleeve, Long idCollar,
                                                                   Long idColor, Long idSize, Long patternId, Long formId,
                                                                   Long brandId, Long categoryId, BigDecimal minPrice,
                                                                   BigDecimal maxPrice);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category,   pd.button AS button" +
            ", pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve" +
            ", pd.size AS size, pd.color AS color, pd.shirtTail AS shirtTail" +
            ", pd.price AS price, pd.weight as weight, pd.quantity AS quantity, pd.descriptionDetail AS descriptionDetail" +
            " FROM ProductDetail pd WHERE pd.product.productName like ?1 or pd.product.productCode" +
            " like ?1 or ?1 is NULl")
    public List<ProductDetailResponse> searchProductDetail(String productName);

    @Query("SELECT MAX(pd.price) FROM ProductDetail pd where pd.product.id = ?1")
    public BigDecimal getMaxPricePDByProductId(Long productId);

    @Query("SELECT new java.lang.Long(pd.id) " +
            " FROM ProductDetail pd " +
            "left join PromotionProduct pp on pd.id = pp.productDetailId.id " +
            "left join Promotion p on p.id = pp.promotion.id " +
            "where p.id = ?1")
    List<Long> findAllByIdPromotion(Long promotionId);

    @Query(name = "ProductDetail.getProductDetailsTableByConditionDTO", nativeQuery = true)
    List<ProductsDetailsResponse> getProductDetailsTableByConditionDTO(List<Long> idProducts,
                                                                       Long idButtons,
                                                                       Long idMaterials,
                                                                       Long idCollars,
                                                                       Long idSleeves,
                                                                       Long idShirtTailTypes,
                                                                       Long idSizes,
                                                                       Long idColors,
                                                                       String searchText);
}
