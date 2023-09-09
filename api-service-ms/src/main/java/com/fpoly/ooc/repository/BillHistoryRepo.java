package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.BillHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillHistoryRepo extends JpaRepository<BillHistory, Long> {
}
