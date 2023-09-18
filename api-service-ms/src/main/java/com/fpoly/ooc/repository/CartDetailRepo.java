package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.responce.cart.CartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.cart.CartResponse(c.id, cd.id,pd.id, p.imgDefault, p.productName, " +
            "s.sizeName, color.colorName, pd.price, cd.quantity) " +
            "FROM CartDetail cd " +
            "JOIN cd.cart c " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p " +
            "JOIN pd.size s " +
            "JOIN pd.color color")
    List<CartResponse> getAllCart();

    CartDetail findByCartIdAndProductDetailId(Long cartId, Long productDetailid);

    @Modifying
    @Query("UPDATE CartDetail cd SET cd.quantity = :quantity WHERE cd.id = :id")
    CartDetail updateQuantity(@Param("id") Long id, @Param("quantity") Integer quantity);

}
