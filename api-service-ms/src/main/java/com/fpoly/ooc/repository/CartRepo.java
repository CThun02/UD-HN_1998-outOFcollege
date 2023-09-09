package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.responce.CartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.CartResponse(c.id, cd.id, cd.quantity, p.productName, pd.price) " +
            "FROM CartDetail cd " +
            "JOIN cd.cart c " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p")
    List<CartResponse> getAll();
}
