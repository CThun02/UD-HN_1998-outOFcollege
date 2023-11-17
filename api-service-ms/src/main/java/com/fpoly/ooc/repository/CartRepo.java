package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

    Cart findCartByAccount(Account account);

}
