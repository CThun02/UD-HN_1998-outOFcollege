package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.DiscountHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountHistoryRepository extends JpaRepository<DiscountHistory, Long> {
}
