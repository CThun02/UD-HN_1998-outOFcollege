package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.VoucherHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherHistoryRepository extends JpaRepository<VoucherHistory, Long> {
}
