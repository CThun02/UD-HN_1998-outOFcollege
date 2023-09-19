package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.responce.CartResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.CartResponse(c.id, cd.id, p.productName, cd.quantity, p.id, pd.price) " +
            "FROM CartDetail cd " +
            "JOIN cd.cart c " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p")
    List<CartResponse> getAllCart();

    CartDetail findByCartIdAndProductDetailId(Long cartId, Long productDetailid);

    @Modifying
    @Query("UPDATE CartDetail cd SET cd.quantity = :quantity WHERE cd.id = :id")
    CartDetail updateQuantity(@Param("id") Long id, @Param("quantity") Integer quantity);

}