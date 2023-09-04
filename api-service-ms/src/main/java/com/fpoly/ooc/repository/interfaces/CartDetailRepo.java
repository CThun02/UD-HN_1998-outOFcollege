package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {
}
