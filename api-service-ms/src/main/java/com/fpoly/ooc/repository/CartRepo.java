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

}
