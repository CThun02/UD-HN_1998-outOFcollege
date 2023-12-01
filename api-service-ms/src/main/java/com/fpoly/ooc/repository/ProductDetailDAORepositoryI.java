package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
@Repository
public interface ProductDetailDAORepositoryI extends JpaRepository<ProductDetail, Long> {
    @Query("SELECT DISTINCT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button" +
            ", pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve" +
            ", pd.size AS size, pd.color AS color, pd.shirtTail AS shirtTail"+
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

    @Query("SELECT DISTINCT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button" +
            ", pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve" +
            ", pd.size AS size, pd.color AS color, pd.shirtTail AS shirtTail, p.promotionMethod as promotionMethod" +
            ", p.promotionValue as promotionValue, p.promotionCondition as promotionCondition" +
            ", pd.price AS price, pd.weight as weight, pd.quantity AS quantity, pd.descriptionDetail AS descriptionDetail" +
            ", pd.pattern as pattern, pd.form as form, pd.status as status FROM ProductDetail pd "+
            "left join PromotionProduct pp on pp.productDetailId.id = pd.id " +
            "left join Promotion  p on p.id = pp.promotion.id AND  p.status = 'ACTIVE'"+
            "WHERE (pd.id = ?1 OR ?1 IS NULL) ")
    public ProductDetailResponse getProductDetailResponseById(Long productDetailId);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category,   pd.button AS button" +
            ", pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve" +
            ", pd.size AS size, pd.color AS color, pd.shirtTail AS shirtTail" +
            ", pd.price AS price, pd.weight as weight, pd.quantity AS quantity, pd.descriptionDetail AS descriptionDetail" +
            " FROM ProductDetail pd WHERE pd.product.productName like ?1 or pd.product.productCode" +
            " like ?1 or ?1 is NULl")
    public List<ProductDetailResponse> searchProductDetail(String productName);

    @Query("SELECT MAX(pd.price) FROM ProductDetail pd where pd.product.id = ?1")
    public BigDecimal getMaxPricePDByProductId(Long productId);

    @Modifying
    @Transactional
    @Query("Update ProductDetail  pd set pd.status = ?2 where pd.product.id =?1")
    public void updateProductDetailsByProductId(Long productId, String status);

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

    @Query("""
                SELECT NEW
                com.fpoly.ooc.responce.productdetail.ProductDetailShop(
                pd.id, pt.id, br.id, category.id, pattern.id, form.id, button.id, material.id,
                collar.id, sleeve.id, shirtTail.id, c.categoryName, pt.productName, br.brandName, pn.promotionMethod,
                pn.promotionValue, pd.price, COUNT(bd.id)
                )
                FROM ProductDetail pd
                LEFT JOIN ProductImage pi ON pd.id = pi.productDetail.id
                LEFT JOIN BillDetail bd ON pd.id = bd.productDetail.id
                LEFT JOIN Category c ON c.id = pd.category.id
                LEFT JOIN Product pt ON pt.id = pd.product.id
                LEFT JOIN PromotionProduct pp ON pd.id = pp.productDetailId.id
                LEFT JOIN Promotion pn ON pn.id = pp.promotion.id
                LEFT JOIN Brand br ON br.id = pd.brand.id
                LEFT JOIN Category category ON category.id = pd.category.id
                LEFT JOIN Pattern pattern ON pattern.id = pd.pattern.id
                LEFT JOIN Form form ON form.id = pd.form.id
                LEFT JOIN ButtonType button ON button.id = pd.button.id
                LEFT JOIN Material material ON material.id = pd.material.id
                LEFT JOIN CollarType collar ON collar.id = pd.collar.id
                LEFT JOIN SleeveType sleeve ON sleeve.id = pd.sleeve.id
                LEFT JOIN ShirtTailType shirtTail ON shirtTail.id = pd.shirtTail.id
                
                WHERE
                    pd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE
                    AND (pi is null or pi.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (bd is null or bd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pp is null or pp.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pn is null or pn.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pt is null or pt.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (c is null or c.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (br is null or br.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (category is null or category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pattern is null or pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (form is null or form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (button is null or button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (material is null or material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (collar is null or collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (sleeve is null or sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (shirtTail is null or shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                GROUP BY pd.id, pt.id, br.id, category.id, pattern.id, form.id, button.id, material.id,
                collar.id, sleeve.id, shirtTail.id, c.categoryName, pt.productName, br.brandName,
                 pn.promotionMethod, pn.promotionValue, pd.price, pd.createdAt
                ORDER BY COUNT(bd.id) DESC
                LIMIT 4
            """)
    List<ProductDetailShop> getProductDetailBestSelling();

    @Query("""
                SELECT NEW
                com.fpoly.ooc.responce.productdetail.ProductDetailShop(
                pd.id, pt.id, br.id, category.id, pattern.id, form.id, button.id, material.id,
                collar.id, sleeve.id, shirtTail.id, c.categoryName, pt.productName, br.brandName,
                pn.promotionMethod, pn.promotionValue, pd.price, COUNT(bd.id)
                )
                FROM ProductDetail pd
                LEFT JOIN ProductImage pi ON pd.id = pi.productDetail.id
                LEFT JOIN BillDetail bd ON pd.id = bd.productDetail.id
                LEFT JOIN Category c ON c.id = pd.category.id
                LEFT JOIN Product pt ON pt.id = pd.product.id
                LEFT JOIN PromotionProduct pp ON pd.id = pp.productDetailId.id
                LEFT JOIN Promotion pn ON pn.id = pp.promotion.id
                LEFT JOIN Brand br ON br.id = pd.brand.id
                LEFT JOIN Category category ON category.id = pd.category.id
                LEFT JOIN Pattern pattern ON pattern.id = pd.pattern.id
                LEFT JOIN Form form ON form.id = pd.form.id
                LEFT JOIN ButtonType button ON button.id = pd.button.id
                LEFT JOIN Material material ON material.id = pd.material.id
                LEFT JOIN CollarType collar ON collar.id = pd.collar.id
                LEFT JOIN SleeveType sleeve ON sleeve.id = pd.sleeve.id
                LEFT JOIN ShirtTailType shirtTail ON shirtTail.id = pd.shirtTail.id
                
                WHERE
                    pd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE
                    AND (pi is null or pi.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (bd is null or bd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pp is null or pp.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pn is null or pn.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pt is null or pt.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (c is null or c.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (br is null or br.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (category is null or category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (pattern is null or pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (form is null or form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (button is null or button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (material is null or material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (collar is null or collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (sleeve is null or sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                    AND (shirtTail is null or shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE)
                GROUP BY pd.id, pt.id, br.id, category.id, pattern.id, form.id, button.id, material.id,
                collar.id, sleeve.id, shirtTail.id, c.categoryName, pt.productName, br.brandName,
                pn.promotionMethod, pn.promotionValue, pd.price, pd.createdAt
                ORDER BY pd.createdAt DESC
                LIMIT 4
            """)
    List<ProductDetailShop> getNewProductDetail();

    @Query(name = "ProductDetail.getAllProductDetailShop", nativeQuery = true)
    List<ProductDetailShop> getAllProductDetailShop(String productName,
                                                    BigDecimal minPrice,
                                                    BigDecimal maxPrice,
                                                    String cateStr,
                                                    String brandStr,
                                                    String colorStr,
                                                    String sizeStr,
                                                    List<Long> categories,
                                                    List<Long> brands,
                                                    List<Long> colors,
                                                    List<Long> sizes,
                                                    String sort);

    @Query("select new com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity(" +
            "min(productDetail.price), max(productDetail.price), sum(productDetail.quantity)) " +
            "from ProductDetail productDetail " +
            "left join Product product on productDetail.product.id = product.id " +
            "left join Color color on productDetail.color.id = color.id " +
            "left join Size s on productDetail.size.id = s.id " +
            "left join Brand b on productDetail.brand.id = b.id " +
            "left join Category cate on productDetail.category.id = cate.id " +
            "left join Pattern patt on productDetail.pattern.id = patt.id " +
            "left join Form form on productDetail.form.id = form.id " +
            "left join ButtonType button on productDetail.button.id = button.id " +
            "left join Material mate on productDetail.material.id = mate.id " +
            "left join CollarType collar on productDetail.collar.id = collar.id " +
            "left join SleeveType sleeve on productDetail.sleeve.id = sleeve.id " +
            "left join ShirtTailType shirt on productDetail.shirtTail.id = shirt.id " +
            "where " +
            "productDetail.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and color.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and s.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and b.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and cate.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and patt.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and form.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and button.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and mate.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and collar.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and sleeve.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and shirt.status like com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and product.id = :productId " +
            "and (:brandId is null or b.id = :brandId) " +
            "and (:categoryId is null or cate.id = :categoryId) " +
            "and (:patternId is null or patt.id = :patternId) " +
            "and (:formId is null or form.id = :formId) " +
            "and (:buttonId is null or button.id = :buttonId) " +
            "and (:materialId is null or mate.id = :materialId) " +
            "and (:collarId is null or collar.id = :collarId) " +
            "and (:sleeveId is null or sleeve.id = :sleeveId) " +
            "and (:shirtId is null or shirt.id = :shirtId) " +
            "and (:colorId is null or color.id  = :colorId)" +
            "and (:sizeId is null or s.id = :sizeId) ")
    GetColorAndSizeAndQuantity findColorAndSize(@Param("productId") Long productId,
                                                @Param("brandId") Long brandId,
                                                @Param("categoryId") Long categoryId,
                                                @Param("patternId") Long patternId,
                                                @Param("formId") Long formId,
                                                @Param("buttonId") Long buttonId,
                                                @Param("materialId") Long materialId,
                                                @Param("collarId") Long collarId,
                                                @Param("sleeveId") Long sleeveId,
                                                @Param("shirtId") Long shirtId,
                                                @Param("colorId") Long colorId,
                                                @Param("sizeId") Long sizeId);

    @Query("select new com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse(" +
            "productDetail.id, product.id, brand.id, category.id, pattern.id, form.id, button.id, " +
            "material.id, collar.id, sleeve.id, shirtTail.id, product.productName, brand.brandName, " +
            "category.categoryName, pattern.patternName, form.formName, button.buttonName, " +
            "material.materialName, collar.collarTypeName, sleeve.sleeveName, shirtTail.shirtTailTypeName, " +
            "productDetail.weight, productDetail.descriptionDetail, promotion.promotionMethod, promotion.promotionValue) " +
            "from ProductDetail productDetail " +
            "left join Product product on product.id = productDetail.product.id " +
            "left join Brand brand on brand.id = productDetail.brand.id " +
            "left join Category category on category.id = productDetail.category.id " +
            "left join Pattern pattern on pattern.id = productDetail.pattern.id " +
            "left join Form form on form.id = productDetail.form.id " +
            "left join ButtonType button on button.id = productDetail.button.id " +
            "left join Material material on material.id = productDetail.material.id " +
            "left join CollarType collar on collar.id = productDetail.collar.id " +
            "left join SleeveType sleeve on sleeve.id = productDetail.sleeve.id " +
            "left join ShirtTailType shirtTail on shirtTail.id = productDetail.shirtTail.id " +
            "left join PromotionProduct promotionProduct on promotionProduct.productDetailId.id = productDetail.id " +
            "left join Promotion promotion on promotion.id = promotionProduct.promotion.id " +
            "where productDetail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and product.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and brand.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and (promotionProduct.productDetailId.id is null or promotionProduct.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE) " +
            "and (promotionProduct.productDetailId.id is null or promotion.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE) " +
            "and product.id = :productId " +
            "and brand.id = :brandId " +
            "and category.id = :categoryId " +
            "and pattern.id = :patternId " +
            "and form.id = :formId " +
            "and button.id = :buttonId " +
            "and material.id = :materialId " +
            "and collar.id = :collarId " +
            "and sleeve.id = :sleeveId " +
            "and shirtTail.id = :shirtId")
    List<ProductDetailShopResponse> findProductDetailShopResponse(@Param("productId") Long productId,
                                                            @Param("brandId") Long brandId,
                                                            @Param("categoryId") Long categoryId,
                                                            @Param("patternId") Long patternId,
                                                            @Param("formId") Long formId,
                                                            @Param("buttonId") Long buttonId,
                                                            @Param("materialId") Long materialId,
                                                            @Param("collarId") Long collarId,
                                                            @Param("sleeveId") Long sleeveId,
                                                            @Param("shirtId") Long shirtId);

    @Query("select productDetail.id " +
            "from ProductDetail productDetail " +
            "left join Product product on productDetail.product.id = product.id " +
            "left join Color color on productDetail.color.id = color.id " +
            "left join Size s on productDetail.size.id = s.id " +
            "left join Brand b on productDetail.brand.id = b.id " +
            "left join Category cate on productDetail.category.id = cate.id " +
            "left join Pattern patt on productDetail.pattern.id = patt.id " +
            "left join Form form on productDetail.form.id = form.id " +
            "left join ButtonType button on productDetail.button.id = button.id " +
            "left join Material mate on productDetail.material.id = mate.id " +
            "left join CollarType collar on productDetail.collar.id = collar.id " +
            "left join SleeveType sleeve on productDetail.sleeve.id = sleeve.id " +
            "left join ShirtTailType shirt on productDetail.shirtTail.id = shirt.id " +
            "where " +
            "productDetail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and color.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and s.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and b.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and cate.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and patt.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and mate.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and shirt.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and product.id = :productId " +
            "and (b.id = :brandId) " +
            "and (cate.id = :categoryId) " +
            "and (patt.id = :patternId) " +
            "and (form.id = :formId) " +
            "and (button.id = :buttonId) " +
            "and (mate.id = :materialId) " +
            "and (collar.id = :collarId) " +
            "and (sleeve.id = :sleeveId) " +
            "and (shirt.id = :shirtId) " +
            "and (color.id  = :colorId)" +
            "and (s.id = :sizeId) ")
    List<Long> productDetailsId(@Param("productId") Long productId,
                                @Param("brandId") Long brandId,
                                @Param("categoryId") Long categoryId,
                                @Param("patternId") Long patternId,
                                @Param("formId") Long formId,
                                @Param("buttonId") Long buttonId,
                                @Param("materialId") Long materialId,
                                @Param("collarId") Long collarId,
                                @Param("sleeveId") Long sleeveId,
                                @Param("shirtId") Long shirtId,
                                @Param("colorId") Long colorId,
                                @Param("sizeId") Long sizeId);
}
