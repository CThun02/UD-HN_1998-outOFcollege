package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.responce.cart.CartDetailResponse;
import com.fpoly.ooc.responce.cart.CartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {

//    @Query("SELECT new com.fpoly.ooc.responce.cart.CartResponse(c.id, cd.id,pd.id, p.productName, " +
//            "s.sizeName, color.colorName, pd.price, cd.quantity) " +
//            "FROM CartDetail cd " +
//            "JOIN cd.cart c " +
//            "JOIN cd.productDetail pd " +
//            "JOIN pd.product p " +
//            "JOIN pd.size s " +
//            "JOIN pd.color color")
//    List<CartResponse> getAllCart();

    @Query("SELECT NEW com.fpoly.ooc.responce.cart.CartDetailResponse(pd.product.id, pd.id, pd.product.productName, pd.brand.brandName," +
            "   pd.category.categoryName, pd.pattern.patternName, pd.form.formName, pd.button.buttonName, " +
            "   pd.material.materialName, pd.collar.collarTypeName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName," +
            "   pd.size.sizeName, pd.color.colorName, pd.color.colorCode, pd.price, pd.quantity, pd.weight, cd.quantity," +
            "   cd.id) " +
            "FROM Cart c JOIN CartDetail cd ON c.id = cd.cart.id " +
            "   JOIN ProductDetail pd ON pd.id = cd.productDetail.id " +
            "   WHERE c.account.username like :username " +
            "       AND pd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.color.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.size.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.product.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.brand.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND c.account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE ")
    List<CartDetailResponse> getAllCart(@Param("username") String username);

    @Query("SELECT NEW com.fpoly.ooc.responce.cart.CartDetailResponse(pd.product.id, pd.id, pd.product.productName, pd.brand.brandName," +
            "   pd.category.categoryName, pd.pattern.patternName, pd.form.formName, pd.button.buttonName, " +
            "   pd.material.materialName, pd.collar.collarTypeName, pd.sleeve.sleeveName, pd.shirtTail.shirtTailTypeName," +
            "   pd.size.sizeName, pd.color.colorName, pd.color.colorCode, pd.price, pd.quantity, pd.weight, pd.quantity," +
            "   pd.id) " +
            "FROM ProductDetail pd " +
            "   WHERE pd.id = :id " +
            "       AND pd.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.color.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.collar.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.size.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.shirtTail.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.sleeve.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.material.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.product.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.category.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.button.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.form.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.brand.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "       AND pd.pattern.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE ")
    List<CartDetailResponse> getProductDetailId(@Param("id") Long productDetailId);

}
