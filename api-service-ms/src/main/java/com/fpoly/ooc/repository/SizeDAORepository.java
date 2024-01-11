package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeDAORepository extends JpaRepository<Size, Long> {
    Size findFirstBySizeName(String name);

    @Query("select distinct new com.fpoly.ooc.entity.Size(s.id, s.sizeName) from Size s " +
            "left join ProductDetail productDetail on s.id = productDetail.size.id " +
            "where s.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
//            "and productDetail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.quantity >= 0 " +
            "and productDetail.brand.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and productDetail.color.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
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
            "and (:colorId is null or productDetail.color.id = :colorId) ")
    List<Size> findSizesByProductId(@Param("productId") Long productId,
                                    @Param("brandId") Long brandId,
                                    @Param("categoryId") Long categoryId,
                                    @Param("patternId") Long patternId,
                                    @Param("formId") Long formId,
                                    @Param("buttonId") Long buttonId,
                                    @Param("materialId") Long materialId,
                                    @Param("collarId") Long collarId,
                                    @Param("sleeveId") Long sleeveId,
                                    @Param("shirtTailId") Long shirtTailId,
                                    @Param("colorId") Long colorId);
}
