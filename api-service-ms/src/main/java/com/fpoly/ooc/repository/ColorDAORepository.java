package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorDAORepository extends JpaRepository<Color, Long> {
    Color findFirstByColorCodeOrColorName(String colorCode, String colorName);

    @Query("select distinct new com.fpoly.ooc.entity.Color(color.id, color.colorCode, color.colorName) from Color color " +
            "left join ProductDetail productDetail on color.id = productDetail.color.id " +
            "where color.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.quantity > 0 " +
            "and productDetail.brand.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.size.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.product.id = :productId " +
            "and productDetail.brand.id = :brandId " +
            "and productDetail.category.id = :categoryId " +
            "and productDetail.pattern.id = :patternId " +
            "and productDetail.form.id = :formId " +
            "and productDetail.button.id = :buttonId " +
            "and productDetail.material.id = :materialId " +
            "and productDetail.collar.id = :collarId " +
            "and productDetail.sleeve.id = :sleeveId " +
            "and productDetail.shirtTail.id = :shirtTailId " +
            "and (:sizeId is null or productDetail.size.id = :sizeId) ")
    List<Color> findColorsByProductId(@Param("productId") Long productId,
                                      @Param("brandId") Long brandId,
                                      @Param("categoryId") Long categoryId,
                                      @Param("patternId") Long patternId,
                                      @Param("formId") Long formId,
                                      @Param("buttonId") Long buttonId,
                                      @Param("materialId") Long materialId,
                                      @Param("collarId") Long collarId,
                                      @Param("sleeveId") Long sleeveId,
                                      @Param("shirtTailId") Long shirtTailId,
                                      @Param("sizeId") Long sizeId);

}
