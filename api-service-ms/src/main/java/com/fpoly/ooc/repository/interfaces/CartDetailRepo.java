package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.responce.CartResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.CartResponse(c.id, cd.id, cd.quantity, p.productName, pd.price, cd.status) " +
            "FROM CartDetail cd " +
            "JOIN cd.cart c " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p")
    Page<CartResponse> getAllCart();

}
