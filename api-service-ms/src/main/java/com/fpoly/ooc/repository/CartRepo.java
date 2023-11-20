package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.responce.cart.CartIndexResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

    Cart findCartByAccount(Account account);

    @Query("SELECT count(cd.id) as quantity, sum(cd.quantity * pd.price) as totalPrice " +
            "FROM Cart c JOIN CartDetail cd ON c.id = cd.cart.id " +
            "JOIN ProductDetail pd ON pd.id = cd.productDetail.id " +
            "WHERE c.account.username = :username")
    CartIndexResponse getCartIndex(@Param("username") String username);

}
